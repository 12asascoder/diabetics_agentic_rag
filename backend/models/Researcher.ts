import mongoose, { Schema, Document } from 'mongoose';

export enum UserRole {
  Administrator = 'Administrator',
  MedicalResearcher = 'Medical Researcher',
  Doctor = 'Doctor',
  ClinicalResearchAssociate = 'Clinical Research Associate',
  Professor = 'Professor',
  PhDScholar = 'PhD Scholar',
  StudentResearcher = 'Student Researcher',
  HospitalResearchTeam = 'Hospital Research Team'
}

export interface IResearcher extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  
  // Onboarding & Verification
  institution: string;
  institutionVerified: boolean;
  emailVerified: boolean;
  medicalSpecialization: string[];
  researchInterests: string[];
  
  // Metadata
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ResearcherSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { 
    type: String, 
    enum: Object.values(UserRole),
    default: UserRole.MedicalResearcher 
  },
  
  institution: { type: String, required: true },
  institutionVerified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
  medicalSpecialization: [{ type: String }],
  researchInterests: [{ type: String }],
  
  lastLoginAt: { type: Date }
}, {
  timestamps: true
});

export default mongoose.model<IResearcher>('Researcher', ResearcherSchema);
