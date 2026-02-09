// Database Initialization Script
// Run this once to set up your database with admin user

import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Client } = pg;

// Your Neon Database URL
const DATABASE_URL = 'postgresql://neondb_owner:npg_aCg4Lch0WiFD@ep-square-field-ae50wkxs-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require';

async function initializeDatabase() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected to Neon PostgreSQL');

    // Create admin_users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create csc_services table
    await client.query(`
      CREATE TABLE IF NOT EXISTS csc_services (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        icon VARCHAR(100),
        category VARCHAR(100),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create mobile_accessories table
    await client.query(`
      CREATE TABLE IF NOT EXISTS mobile_accessories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(100),
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image_url TEXT,
        category VARCHAR(100),
        stock_status VARCHAR(50) DEFAULT 'in_stock',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create mobile_repairing table
    await client.query(`
      CREATE TABLE IF NOT EXISTS mobile_repairing (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        service_name VARCHAR(255) NOT NULL,
        description TEXT,
        price_range VARCHAR(100),
        estimated_time VARCHAR(100),
        brand_compatibility TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Database tables created');

    // Create admin user with proper bcrypt hash
    const adminUsername = 'admin';
    const adminPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await client.query(`
      INSERT INTO admin_users (username, password_hash) 
      VALUES ($1, $2) 
      ON CONFLICT (username) DO UPDATE 
      SET password_hash = $2, updated_at = CURRENT_TIMESTAMP
    `, [adminUsername, hashedPassword]);

    console.log('✅ Admin user created:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('   (Change password after first login)');

    // Insert sample CSC services
    const cscServices = [
      ['Aadhaar Services', 'Aadhaar enrollment, update, and printing services', 'Government'],
      ['PAN Card Services', 'New PAN card application and corrections', 'Government'],
      ['Voter ID Services', 'Voter ID enrollment and corrections', 'Government'],
      ['Passport Services', 'Passport application assistance', 'Government'],
      ['Bill Payment', 'Electricity, water, gas bill payments', 'Utilities'],
      ['Banking Services', 'Bank account opening, deposits, withdrawals', 'Banking'],
      ['Insurance Services', 'Life and general insurance services', 'Insurance'],
      ['Exam Forms', 'Online examination form filling', 'Education']
    ];

    for (const [name, description, category] of cscServices) {
      await client.query(`
        INSERT INTO csc_services (name, description, category) 
        VALUES ($1, $2, $3) 
        ON CONFLICT DO NOTHING
      `, [name, description, category]);
    }

    // Insert sample mobile accessories
    const accessories = [
      ['Tempered Glass', 'Generic', 'Premium quality screen protector', 199.00, 'Screen Protection'],
      ['Mobile Cover', 'Generic', 'Shockproof back cover', 299.00, 'Cases'],
      ['Fast Charger', 'Generic', '33W fast charging adapter', 599.00, 'Chargers'],
      ['USB Cable', 'Generic', 'Type-C fast charging cable', 199.00, 'Cables'],
      ['Earphones', 'Generic', 'Wired earphones with mic', 399.00, 'Audio'],
      ['Power Bank', 'Generic', '10000mAh portable charger', 999.00, 'Power']
    ];

    for (const [name, brand, description, price, category] of accessories) {
      await client.query(`
        INSERT INTO mobile_accessories (name, brand, description, price, category) 
        VALUES ($1, $2, $3, $4, $5) 
        ON CONFLICT DO NOTHING
      `, [name, brand, description, price, category]);
    }

    // Insert sample mobile repairing services
    const repairServices = [
      ['Screen Replacement', 'LCD/OLED screen replacement for all brands', '₹1500 - ₹8000', '1-2 hours'],
      ['Battery Replacement', 'Original battery replacement', '₹800 - ₹2500', '30 mins'],
      ['Charging Port Repair', 'Charging port cleaning/replacement', '₹300 - ₹1200', '1 hour'],
      ['Water Damage Repair', 'Complete water damage treatment', '₹1000 - ₹5000', '2-3 days'],
      ['Software Update', 'OS update and software troubleshooting', '₹200 - ₹500', '30 mins'],
      ['Back Panel Replacement', 'Back glass/panel replacement', '₹500 - ₹3000', '1 hour']
    ];

    for (const [service_name, description, price_range, estimated_time] of repairServices) {
      await client.query(`
        INSERT INTO mobile_repairing (service_name, description, price_range, estimated_time) 
        VALUES ($1, $2, $3, $4) 
        ON CONFLICT DO NOTHING
      `, [service_name, description, price_range, estimated_time]);
    }

    // Verify sample data
    const cscCount = await client.query('SELECT COUNT(*) FROM csc_services');
    const accessoriesCount = await client.query('SELECT COUNT(*) FROM mobile_accessories');
    const repairingCount = await client.query('SELECT COUNT(*) FROM mobile_repairing');

    console.log('\n📊 Database Statistics:');
    console.log(`   CSC Services: ${cscCount.rows[0].count}`);
    console.log(`   Mobile Accessories: ${accessoriesCount.rows[0].count}`);
    console.log(`   Mobile Repairing: ${repairingCount.rows[0].count}`);

    console.log('\n🎉 Database initialization complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

initializeDatabase();
