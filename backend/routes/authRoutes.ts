import express from 'express';

const router = express.Router();

// Authentication has been removed.
// We keep this router mounted so existing frontend configs don't 404 immediately if they ping it,
// though they should no longer do so.
router.get('/me', (req, res) => {
  res.json({
    _id: '66923b2c1234567890abcdef',
    name: 'Global Administrator',
    email: 'admin@diaresearch.iq',
    institution: 'DiaResearch Global',
    role: 'admin'
  });
});

export default router;
