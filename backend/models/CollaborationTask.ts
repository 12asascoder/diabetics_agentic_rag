import mongoose, { Document, Schema } from 'mongoose';

export interface ICollaborationTask extends Document {
  title: string;
  description: string;
  status: 'Todo' | 'InProgress' | 'InReview' | 'Completed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  workspaceId: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const collaborationTaskSchema = new Schema<ICollaborationTask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['Todo', 'InProgress', 'InReview', 'Completed'],
      default: 'Todo'
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium'
    },
    workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'Researcher' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Researcher', required: true },
    dueDate: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.models.CollaborationTask || mongoose.model<ICollaborationTask>('CollaborationTask', collaborationTaskSchema);
