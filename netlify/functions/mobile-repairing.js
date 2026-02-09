// Mobile Repairing Services CRUD API
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
    // GET - Public access (fetch all active repair services)
    if (event.httpMethod === 'GET') {
      const result = await query(
        `SELECT * FROM mobile_repairing 
         WHERE is_active = true 
         ORDER BY created_at DESC`
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

    // POST - Create new repair service
    if (event.httpMethod === 'POST') {
      const { service_name, description, price_range, estimated_time, brand_compatibility } = JSON.parse(event.body);

      if (!service_name) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Service name is required' }),
        };
      }

      const result = await query(
        `INSERT INTO mobile_repairing 
         (service_name, description, price_range, estimated_time, brand_compatibility) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
        [service_name, description, price_range, estimated_time, brand_compatibility]
      );

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ service: result.rows[0] }),
      };
    }

    // PUT - Update repair service
    if (event.httpMethod === 'PUT') {
      const { id, service_name, description, price_range, estimated_time, brand_compatibility, is_active } = JSON.parse(event.body);

      if (!id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Service ID is required' }),
        };
      }

      const result = await query(
        `UPDATE mobile_repairing 
         SET service_name = COALESCE($1, service_name),
             description = COALESCE($2, description),
             price_range = COALESCE($3, price_range),
             estimated_time = COALESCE($4, estimated_time),
             brand_compatibility = COALESCE($5, brand_compatibility),
             is_active = COALESCE($6, is_active),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $7
         RETURNING *`,
        [service_name, description, price_range, estimated_time, brand_compatibility, is_active, id]
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

    // DELETE - Delete repair service
    if (event.httpMethod === 'DELETE') {
      const id = event.queryStringParameters?.id;

      if (!id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Service ID is required' }),
        };
      }

      await query('DELETE FROM mobile_repairing WHERE id = $1', [id]);

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
    console.error('Mobile Repairing API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
