"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutResearcher = exports.loginResearcher = exports.registerResearcher = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Researcher_1 = __importDefault(require("../models/Researcher"));
const env_1 = require("../config/env");
const asyncHandler_1 = require("../middleware/asyncHandler");
const logger_1 = require("../config/logger");
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, env_1.env.JWT_SECRET_KEY, {
        expiresIn: '30d',
    });
};
exports.registerResearcher = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { name, institution, email, password } = req.body;
    logger_1.logger.info(`[Auth] Attempting registration for email: ${email}`);
    const researcherExists = await Researcher_1.default.findOne({ email });
    if (researcherExists) {
        logger_1.logger.warn(`[Auth] Registration failed - Email already exists: ${email}`);
        res.status(409); // Conflict
        throw new Error('Researcher already exists');
    }
    if (!password || password.length < 8) {
        logger_1.logger.warn(`[Auth] Registration failed - Weak password for: ${email}`);
        res.status(422); // Unprocessable Entity
        throw new Error('Password must be at least 8 characters long');
    }
    const salt = await bcrypt_1.default.genSalt(10);
    const passwordHash = await bcrypt_1.default.hash(password, salt);
    const researcher = await Researcher_1.default.create({
        name,
        institution,
        email,
        passwordHash,
    });
    if (researcher) {
        logger_1.logger.info(`[Auth] Successfully registered researcher: ${researcher._id}`);
        const token = generateToken(researcher._id.toString());
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: env_1.env.NODE_ENV !== 'development',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.status(201).json({
            _id: researcher._id,
            name: researcher.name,
            email: researcher.email,
            institution: researcher.institution,
        });
    }
    else {
        logger_1.logger.error(`[Auth] Invalid researcher data during creation for: ${email}`);
        res.status(400);
        throw new Error('Invalid researcher data');
    }
});
exports.loginResearcher = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    logger_1.logger.info(`[Auth] Attempting login for email: ${email}`);
    const researcher = await Researcher_1.default.findOne({ email });
    if (researcher && (await bcrypt_1.default.compare(password, researcher.passwordHash))) {
        logger_1.logger.info(`[Auth] Successful login for: ${researcher._id}`);
        const token = generateToken(researcher._id.toString());
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: env_1.env.NODE_ENV !== 'development',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({
            _id: researcher._id,
            name: researcher.name,
            email: researcher.email,
            institution: researcher.institution,
        });
    }
    else {
        logger_1.logger.warn(`[Auth] Failed login attempt for email: ${email}`);
        res.status(401);
        throw new Error('Invalid email or password');
    }
});
const logoutResearcher = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};
exports.logoutResearcher = logoutResearcher;
