"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const protect = async (req, res, next) => {
    // Authentication has been completely removed as per user request.
    // We attach a mock global administrator to satisfy downstream schema relationships.
    req.researcher = {
        _id: '66923b2c1234567890abcdef',
        name: 'Global Administrator',
        email: 'admin@diaresearch.iq',
        institution: 'DiaResearch Global',
        role: 'admin'
    };
    next();
};
exports.protect = protect;
