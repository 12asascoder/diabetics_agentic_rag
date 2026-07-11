"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var UserRole;
(function (UserRole) {
    UserRole["Administrator"] = "Administrator";
    UserRole["MedicalResearcher"] = "Medical Researcher";
    UserRole["Doctor"] = "Doctor";
    UserRole["ClinicalResearchAssociate"] = "Clinical Research Associate";
    UserRole["Professor"] = "Professor";
    UserRole["PhDScholar"] = "PhD Scholar";
    UserRole["StudentResearcher"] = "Student Researcher";
    UserRole["HospitalResearchTeam"] = "Hospital Research Team";
})(UserRole || (exports.UserRole = UserRole = {}));
const ResearcherSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.default.model('Researcher', ResearcherSchema);
