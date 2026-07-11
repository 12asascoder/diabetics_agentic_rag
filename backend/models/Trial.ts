import mongoose, { Document, Schema } from 'mongoose';

export interface ITrial extends Document {
  trialId: string;
  title: string;
  status: 'Recruiting' | 'Active' | 'Completed' | 'Suspended' | 'Terminated';
  sponsor: string;
  institution: string;
  phase: string;
  country: string;
  eligibility: string;
  drug: string;
  intervention: string;
  outcomes: string[];
  startDate: Date;
  completionDate: Date;
  studyPopulation: number;
  workspaceId?: mongoose.Types.ObjectId; // Optional link to a specific workspace
  createdAt: Date;
  updatedAt: Date;
}

const trialSchema = new Schema<ITrial>(
  {
    trialId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['Recruiting', 'Active', 'Completed', 'Suspended', 'Terminated'], 
      default: 'Active' 
    },
    sponsor: { type: String },
    institution: { type: String },
    phase: { type: String },
    country: { type: String },
    eligibility: { type: String },
    drug: { type: String },
    intervention: { type: String },
    outcomes: [{ type: String }],
    startDate: { type: Date },
    completionDate: { type: Date },
    studyPopulation: { type: Number },
    workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace' },
  },
  { timestamps: true }
);

export default mongoose.models.Trial || mongoose.model<ITrial>('Trial', trialSchema);
