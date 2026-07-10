import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument extends Document {
  filename: string;
  originalName: string;
  filePath: string;
  metadata: Record<string, any>;
  uploadDate: Date;
  documentType: string;
  authors: string[];
  journal: string;
  indexingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  uploadedBy: mongoose.Types.ObjectId;
}

const DocumentSchema: Schema = new Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  filePath: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed, default: {} },
  uploadDate: { type: Date, default: Date.now },
  documentType: { type: String, required: true }, // 'pdf', 'docx', etc.
  authors: [{ type: String }],
  journal: { type: String },
  indexingStatus: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'Researcher', required: true }
}, {
  timestamps: true
});

export default mongoose.model<IDocument>('Document', DocumentSchema);
