import mongoose, { Schema, Document } from 'mongoose';

export enum EdgeRelationship {
  Treats = 'treats',
  AssociatedWith = 'associated_with',
  Supports = 'supports',
  Contradicts = 'contradicts',
  Predicts = 'predicts',
  Authored = 'authored',
  Published = 'published'
}

export interface IKnowledgeGraphEdge extends Document {
  sourceNodeId: mongoose.Types.ObjectId;
  targetNodeId: mongoose.Types.ObjectId;
  relationship: EdgeRelationship | string;
  weight: number;
  evidenceChunkIds: string[]; // Links to Document Chunk IDs that support this relationship
  workspaceId: mongoose.Types.ObjectId;
}

const KnowledgeGraphEdgeSchema: Schema = new Schema({
  sourceNodeId: { type: Schema.Types.ObjectId, ref: 'KnowledgeGraphNode', required: true, index: true },
  targetNodeId: { type: Schema.Types.ObjectId, ref: 'KnowledgeGraphNode', required: true, index: true },
  relationship: { type: String, required: true },
  weight: { type: Number, default: 1.0 },
  evidenceChunkIds: [{ type: String }],
  workspaceId: { type: Schema.Types.ObjectId, ref: 'Workspace', index: true }
}, {
  timestamps: true
});

KnowledgeGraphEdgeSchema.index({ sourceNodeId: 1, targetNodeId: 1, relationship: 1, workspaceId: 1 }, { unique: true });

export default mongoose.model<IKnowledgeGraphEdge>('KnowledgeGraphEdge', KnowledgeGraphEdgeSchema);
