"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sync_1 = require("csv-parse/sync");
const dotenv_1 = __importDefault(require("dotenv"));
const Project_1 = __importDefault(require("../models/Project"));
const Document_1 = __importDefault(require("../models/Document"));
const DocumentTree_1 = __importDefault(require("../models/DocumentTree"));
const Researcher_1 = __importDefault(require("../models/Researcher"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/diabetes_research';
const seedDatabase = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('Connected to MongoDB');
        // Clear existing
        await Project_1.default.deleteMany({});
        await Document_1.default.deleteMany({});
        await DocumentTree_1.default.deleteMany({});
        await Researcher_1.default.deleteMany({});
        // 1. Create a dummy researcher
        const salt = await bcrypt_1.default.genSalt(10);
        const passwordHash = await bcrypt_1.default.hash('password123', salt);
        const researcher = await Researcher_1.default.create({
            name: 'Dr. Jane Doe',
            institution: 'Global Health Institute',
            email: 'jane.doe@example.com',
            passwordHash
        });
        console.log('Created Researcher');
        // 2. Create a project
        const project = await Project_1.default.create({
            title: 'Type 2 Diabetes Risk Prediction & Meta-Analysis',
            description: 'Analysis of multiple clinical datasets to identify risk factors for diabetes onset.',
            researchers: [researcher._id],
            documents: [],
            reports: []
        });
        console.log('Created Project');
        // 3. Process the CSV files
        const filesToProcess = ['diabetes.csv', 'diabetes 1.csv', 'diabetes 2.csv', 'diabetes 3.csv'];
        const projectRoot = path_1.default.join(__dirname, '../../'); // Corrected for being in backend/scripts/
        for (const filename of filesToProcess) {
            const filePath = path_1.default.join(projectRoot, filename);
            if (!fs_1.default.existsSync(filePath)) {
                console.warn(`File not found: ${filePath}, skipping...`);
                continue;
            }
            const fileContent = fs_1.default.readFileSync(filePath, 'utf-8');
            // Parse CSV
            const records = (0, sync_1.parse)(fileContent, {
                columns: true,
                skip_empty_lines: true
            });
            // Create Document entry
            const doc = await Document_1.default.create({
                filename,
                originalName: filename,
                filePath,
                metadata: { rowCount: records.length },
                documentType: 'csv',
                authors: ['Unknown Clinical Source'],
                indexingStatus: 'completed',
                uploadedBy: researcher._id
            });
            console.log(`Created Document for ${filename}`);
            // Add to Project
            project.documents.push(doc._id);
            // Convert CSV rows into a DocumentTree of chunks (PageIndex style)
            // Group every 50 records into a node
            const chunkSize = 50;
            const nodes = [];
            for (let i = 0; i < records.length; i += chunkSize) {
                const chunk = records.slice(i, i + chunkSize);
                // Generate a summary for the chunk
                const avgGlucose = chunk.reduce((acc, r) => acc + (parseFloat(r.Glucose) || 0), 0) / chunk.length;
                const avgBMI = chunk.reduce((acc, r) => acc + (parseFloat(r.BMI) || 0), 0) / chunk.length;
                const positiveCases = chunk.filter((r) => r.Outcome === '1').length;
                nodes.push({
                    title: `Data Partition ${i / chunkSize + 1}`,
                    summary: `Contains ${chunk.length} patient records. Average Glucose: ${avgGlucose.toFixed(2)}, Average BMI: ${avgBMI.toFixed(2)}. ${positiveCases} positive outcomes.`,
                    page_start: i + 1,
                    page_end: i + chunk.length,
                    content: JSON.stringify(chunk), // Keep raw data in content for reasoning
                    references: []
                });
            }
            await DocumentTree_1.default.create({
                document_id: doc._id,
                nodes
            });
            console.log(`Created DocumentTree for ${filename} with ${nodes.length} nodes`);
        }
        await project.save();
        console.log('Seeding completed successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};
seedDatabase();
