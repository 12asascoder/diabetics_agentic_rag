import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  researchers: mongoose.Types.ObjectId[];
  documents: mongoose.Types.ObjectId[];
  reports: mongoose.Types.ObjectId[];
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  researchers: [{ type: Schema.Types.ObjectId, ref: 'Researcher' }],
  documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
  reports: [{ type: Schema.Types.ObjectId, ref: 'Report' }]
}, {
  timestamps: true
});

export default mongoose.model<IProject>('Project', ProjectSchema);
