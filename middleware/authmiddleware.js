// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Extract token from "Bearer <token>"

  console.log(token);

  if (!token) {
    return res.status(401).json({ error: 'Missing Bearer token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // Optional: attach user info to request
    next();
  } catch (err) {
    console.error('Token validation failed:', err.message);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}