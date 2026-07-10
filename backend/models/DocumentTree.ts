import mongoose, { Schema, Document } from 'mongoose';

export interface INode {
  title: string;
  summary: string;
  page_start: number;
  page_end: number;
  content: string;
  references: string[];
}

export interface IDocumentTree extends Document {
  document_id: mongoose.Types.ObjectId;
  nodes: INode[];
}

const NodeSchema = new Schema<INode>({
  title: { type: String, required: true },
  summary: { type: String },
  page_start: { type: Number, required: true },
  page_end: { type: Number, required: true },
  content: { type: String, required: true },
  references: [{ type: String }]
}, { _id: false });

const DocumentTreeSchema: Schema = new Schema({
  document_id: { type: Schema.Types.ObjectId, ref: 'Document', required: true, unique: true },
  nodes: [NodeSchema]
}, {
  timestamps: true
});

export default mongoose.model<IDocumentTree>('DocumentTree', DocumentTreeSchema);
