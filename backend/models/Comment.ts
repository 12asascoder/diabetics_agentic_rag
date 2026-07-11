import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  content: string;
  targetType: 'Trial' | 'Protocol' | 'RegistryItem' | 'Task' | 'Document';
  targetId: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  mentions?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    targetType: { 
      type: String, 
      enum: ['Trial', 'Protocol', 'RegistryItem', 'Task', 'Document'], 
      required: true 
    },
    targetId: { type: Schema.Types.ObjectId, required: true },
    workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Researcher', required: true },
    mentions: [{ type: Schema.Types.ObjectId, ref: 'Researcher' }]
  },
  { timestamps: true }
);

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', commentSchema);
