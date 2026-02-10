// CSC Services CRUD API
import { query } from './utils/db.js';
import { authenticate, corsHeaders } from './utils/auth.js';

export async function handler(event) {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: '',
    };
  }

  const headers = corsHeaders();

  try {
    // GET - Public access (fetch all active services)
    if (event.httpMethod === 'GET') {
      const result = await query(
        'SELECT * FROM csc_services WHERE is_active = true ORDER BY created_at DESC'
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ services: result.rows }),
      };
    }

    // All other methods require authentication
    const auth = authenticate(event);
    if (!auth.authenticated) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: auth.error }),
      };
    }

    // POST - Create new service
    if (event.httpMethod === 'POST') {
      const { name, description, detailed_description, icon, category } = JSON.parse(event.body);

      if (!name) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Service name is required' }),
        };
      }

      const result = await query(
        `INSERT INTO csc_services (name, description, detailed_description, icon, category) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
        [name, description, detailed_description, icon, category]
      );

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ service: result.rows[0] }),
      };
    }

    // PUT - Update service
    if (event.httpMethod === 'PUT') {
      const { id, name, description, detailed_description, icon, category, is_active } = JSON.parse(event.body);

      if (!id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Service ID is required' }),
        };
      }

      const result = await query(
        `UPDATE csc_services 
         SET name = COALESCE($1, name),
             description = COALESCE($2, description),
             detailed_description = COALESCE($3, detailed_description),
             icon = COALESCE($4, icon),
             category = COALESCE($5, category),
             is_active = COALESCE($6, is_active),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $7
         RETURNING *`,
        [name, description, detailed_description, icon, category, is_active, id]
      );

      if (result.rows.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Service not found' }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ service: result.rows[0] }),
      };
    }

    // DELETE - Delete service
    if (event.httpMethod === 'DELETE') {
      const id = event.queryStringParameters?.id;

      if (!id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Service ID is required' }),
        };
      }

      await query('DELETE FROM csc_services WHERE id = $1', [id]);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('CSC Services API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
