import mongoose, { Schema, Document } from 'mongoose';

export interface IResearchQuery extends Document {
  project_id: mongoose.Types.ObjectId;
  researcher_id: mongoose.Types.ObjectId;
  question: string;
  retrieved_evidence: any[];
  generated_answer: string;
  citations: any[];
}

const ResearchQuerySchema: Schema = new Schema({
  project_id: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  researcher_id: { type: Schema.Types.ObjectId, ref: 'Researcher', required: true },
  question: { type: String, required: true },
  retrieved_evidence: [{ type: Schema.Types.Mixed }],
  generated_answer: { type: String, required: true },
  citations: [{ type: Schema.Types.Mixed }]
}, {
  timestamps: true
});

export default mongoose.model<IResearchQuery>('ResearchQuery', ResearchQuerySchema);
