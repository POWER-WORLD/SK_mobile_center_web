// Mobile Accessories CRUD API
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
    // GET - Public access (fetch all active accessories)
    if (event.httpMethod === 'GET') {
      const result = await query(
        `SELECT * FROM mobile_accessories 
         WHERE is_active = true 
         ORDER BY category, name`
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ accessories: result.rows }),
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

    // POST - Create new accessory
    if (event.httpMethod === 'POST') {
      const { name, brand, description, price, image_url, category, stock_status } = JSON.parse(event.body);

      if (!name || !price) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Name and price are required' }),
        };
      }

      const result = await query(
        `INSERT INTO mobile_accessories 
         (name, brand, description, price, image_url, category, stock_status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) 
         RETURNING *`,
        [name, brand, description, price, image_url, category, stock_status || 'in_stock']
      );

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ accessory: result.rows[0] }),
      };
    }

    // PUT - Update accessory
    if (event.httpMethod === 'PUT') {
      const { id, name, brand, description, price, image_url, category, stock_status, is_active } = JSON.parse(event.body);

      if (!id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Accessory ID is required' }),
        };
      }

      const result = await query(
        `UPDATE mobile_accessories 
         SET name = COALESCE($1, name),
             brand = COALESCE($2, brand),
             description = COALESCE($3, description),
             price = COALESCE($4, price),
             image_url = COALESCE($5, image_url),
             category = COALESCE($6, category),
             stock_status = COALESCE($7, stock_status),
             is_active = COALESCE($8, is_active),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $9
         RETURNING *`,
        [name, brand, description, price, image_url, category, stock_status, is_active, id]
      );

      if (result.rows.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Accessory not found' }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ accessory: result.rows[0] }),
      };
    }

    // DELETE - Delete accessory
    if (event.httpMethod === 'DELETE') {
      const id = event.queryStringParameters?.id;

      if (!id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Accessory ID is required' }),
        };
      }

      await query('DELETE FROM mobile_accessories WHERE id = $1', [id]);

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
    console.error('Mobile Accessories API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
