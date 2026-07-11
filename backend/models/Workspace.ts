import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkspace extends Document {
  title: string;
  institution: string;
  researchFocus: string;
  diseaseCategory: string;
  keywords: string[];
  studyObjectives: string;
  researchQuestions: string[];
  
  ownerId: mongoose.Types.ObjectId;
  collaborators: mongoose.Types.ObjectId[];
  
  createdAt: Date;
  updatedAt: Date;
}

const WorkspaceSchema: Schema = new Schema({
  title: { type: String, required: true },
  institution: { type: String, required: true },
  researchFocus: { type: String, required: true },
  diseaseCategory: { type: String, required: true },
  keywords: [{ type: String }],
  studyObjectives: { type: String, required: true },
  researchQuestions: [{ type: String }],
  
  ownerId: { type: Schema.Types.ObjectId, ref: 'Researcher', required: true },
  collaborators: [{ type: Schema.Types.ObjectId, ref: 'Researcher' }]
}, {
  timestamps: true
});

export default mongoose.model<IWorkspace>('Workspace', WorkspaceSchema);
