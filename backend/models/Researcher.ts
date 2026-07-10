import mongoose, { Schema, Document } from 'mongoose';

export interface IResearcher extends Document {
  name: string;
  institution: string;
  email: string;
  role: string;
  passwordHash: string;
}

const ResearcherSchema: Schema = new Schema({
  name: { type: String, required: true },
  institution: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'researcher' },
  passwordHash: { type: String, required: true },
}, {
  timestamps: true
});

export default mongoose.model<IResearcher>('Researcher', ResearcherSchema);
