import mongoose, { Document, Schema } from 'mongoose';

export interface IRegistryItem extends Document {
  itemType: 'Patient' | 'Study' | 'Dataset' | 'Institution' | 'Researcher' | 'Project' | 'Document' | 'ClinicalTrial';
  name: string;
  description: string;
  tags: string[];
  metadata: Record<string, any>; // Flexible schema for different registry types
  workspaceId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const registryItemSchema = new Schema<IRegistryItem>(
  {
    itemType: { 
      type: String, 
      enum: ['Patient', 'Study', 'Dataset', 'Institution', 'Researcher', 'Project', 'Document', 'ClinicalTrial'],
      required: true 
    },
    name: { type: String, required: true },
    description: { type: String },
    tags: [{ type: String }],
    metadata: { type: Schema.Types.Mixed, default: {} },
    workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Researcher', required: true }
  },
  { timestamps: true }
);

// Index for search
registryItemSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.models.RegistryItem || mongoose.model<IRegistryItem>('RegistryItem', registryItemSchema);
