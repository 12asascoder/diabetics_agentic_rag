import mongoose, { Schema, Document } from 'mongoose';

export enum EntityType {
  Disease = 'Disease',
  Treatment = 'Treatment',
  Drug = 'Drug',
  Biomarker = 'Biomarker',
  Gene = 'Gene',
  Symptom = 'Symptom',
  Complication = 'Complication',
  LifestyleFactor = 'Lifestyle Factor',
  ClinicalOutcome = 'Clinical Outcome',
  LaboratoryTest = 'Laboratory Test',
  MedicalDevice = 'Medical Device',
  Researcher = 'Researcher',
  Institution = 'Institution',
  ClinicalTrial = 'Clinical Trial'
}

export interface IKnowledgeGraphNode extends Document {
  name: string;
  entityType: EntityType;
  description?: string;
  aliases: string[];
  workspaceId: mongoose.Types.ObjectId; // A graph could be global or isolated to a workspace
}

const KnowledgeGraphNodeSchema: Schema = new Schema({
  name: { type: String, required: true, index: true },
  entityType: { type: String, enum: Object.values(EntityType), required: true },
  description: { type: String },
  aliases: [{ type: String }],
  workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace', index: true } // Null implies global knowledge
}, {
  timestamps: true
});

// Ensure uniqueness within a workspace (or globally if workspaceId is null)
KnowledgeGraphNodeSchema.index({ name: 1, entityType: 1, workspaceId: 1 }, { unique: true });

export default mongoose.model<IKnowledgeGraphNode>('KnowledgeGraphNode', KnowledgeGraphNodeSchema);
