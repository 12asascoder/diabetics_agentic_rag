import mongoose, { Document, Schema } from 'mongoose';

export interface IProtocol extends Document {
  title: string;
  researchProtocol: string;
  clinicalWorkflow: string;
  methodology: string;
  objectives: string[];
  inclusionCriteria: string[];
  exclusionCriteria: string[];
  sampleSize: number;
  outcomeMeasures: string[];
  ethicsApprovalStatus: 'Pending' | 'Approved' | 'Rejected';
  version: string;
  workspaceId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  attachments: string[]; // S3 or GridFS links
  createdAt: Date;
  updatedAt: Date;
}

const protocolSchema = new Schema<IProtocol>(
  {
    title: { type: String, required: true },
    researchProtocol: { type: String },
    clinicalWorkflow: { type: String },
    methodology: { type: String },
    objectives: [{ type: String }],
    inclusionCriteria: [{ type: String }],
    exclusionCriteria: [{ type: String }],
    sampleSize: { type: Number },
    outcomeMeasures: [{ type: String }],
    ethicsApprovalStatus: { 
      type: String, 
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    },
    version: { type: String, default: '1.0' },
    workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Researcher', required: true },
    attachments: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Protocol || mongoose.model<IProtocol>('Protocol', protocolSchema);
