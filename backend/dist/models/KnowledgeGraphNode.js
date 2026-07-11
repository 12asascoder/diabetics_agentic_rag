"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityType = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var EntityType;
(function (EntityType) {
    EntityType["Disease"] = "Disease";
    EntityType["Treatment"] = "Treatment";
    EntityType["Drug"] = "Drug";
    EntityType["Biomarker"] = "Biomarker";
    EntityType["Gene"] = "Gene";
    EntityType["Symptom"] = "Symptom";
    EntityType["Complication"] = "Complication";
    EntityType["LifestyleFactor"] = "Lifestyle Factor";
    EntityType["ClinicalOutcome"] = "Clinical Outcome";
    EntityType["LaboratoryTest"] = "Laboratory Test";
    EntityType["MedicalDevice"] = "Medical Device";
    EntityType["Researcher"] = "Researcher";
    EntityType["Institution"] = "Institution";
    EntityType["ClinicalTrial"] = "Clinical Trial";
})(EntityType || (exports.EntityType = EntityType = {}));
const KnowledgeGraphNodeSchema = new mongoose_1.Schema({
    name: { type: String, required: true, index: true },
    entityType: { type: String, enum: Object.values(EntityType), required: true },
    description: { type: String },
    aliases: [{ type: String }],
    workspaceId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Workspace', index: true } // Null implies global knowledge
}, {
    timestamps: true
});
// Ensure uniqueness within a workspace (or globally if workspaceId is null)
KnowledgeGraphNodeSchema.index({ name: 1, entityType: 1, workspaceId: 1 }, { unique: true });
exports.default = mongoose_1.default.model('KnowledgeGraphNode', KnowledgeGraphNodeSchema);
