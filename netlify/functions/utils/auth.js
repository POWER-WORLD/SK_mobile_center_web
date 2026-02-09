// Authentication middleware for Netlify Functions
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sk-mobile-jwt-secret-key-2026';

export function generateToken(userId, username) {
  return jwt.sign(
    { userId, username },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function authenticate(event) {
  const authHeader = event.headers.authorization || event.headers.Authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { authenticated: false, error: 'No token provided' };
  }

  const token = authHeader.substring(7);
  const decoded = verifyToken(token);

  if (!decoded) {
    return { authenticated: false, error: 'Invalid or expired token' };
  }

  return { authenticated: true, user: decoded };
}

export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };
}
