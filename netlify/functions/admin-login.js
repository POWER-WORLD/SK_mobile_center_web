// Admin Login Function
import bcrypt from 'bcryptjs';
import { query } from './utils/db.js';
import { generateToken, corsHeaders } from './utils/auth.js';

export async function handler(event) {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { username, password } = JSON.parse(event.body);

    if (!username || !password) {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({ error: 'Username and password required' }),
      };
    }

    // Find admin user
    const result = await query(
      'SELECT * FROM admin_users WHERE username = $1', 
      [username]
    );

    if (result.rows.length === 0) {
      return {
        statusCode: 401,
        headers: corsHeaders(),
        body: JSON.stringify({ error: 'Invalid credentials' }),
      };
    }

    const admin = result.rows[0];

    // Verify password
    const isValid = await bcrypt.compare(password, admin.password_hash);

    if (!isValid) {
      return {
        statusCode: 401,
        headers: corsHeaders(),
        body: JSON.stringify({ error: 'Invalid credentials' }),
      };
    }

    // Generate JWT token
    const token = generateToken(admin.id, admin.username);

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({
        success: true,
        token,
        user: {
          id: admin.id,
          username: admin.username,
        },
      }),
    };

  } catch (error) {
    console.error('Login error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
