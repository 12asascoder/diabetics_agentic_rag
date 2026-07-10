import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
  project_id: mongoose.Types.ObjectId;
  title: string;
  generated_summaries: string;
  treatment_comparisons: any;
  evidence_analysis: any;
}

const ReportSchema: Schema = new Schema({
  project_id: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true },
  generated_summaries: { type: String },
  treatment_comparisons: { type: Schema.Types.Mixed },
  evidence_analysis: { type: Schema.Types.Mixed }
}, {
  timestamps: true
});

export default mongoose.model<IReport>('Report', ReportSchema);
