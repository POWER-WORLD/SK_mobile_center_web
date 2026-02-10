-- SK Mobile Center Database Schema
-- Run this in your Neon PostgreSQL database

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. CSC / Jan Seva Services Table
CREATE TABLE IF NOT EXISTS csc_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  detailed_description TEXT,
  icon VARCHAR(100),
  category VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Mobile Accessories Table
CREATE TABLE IF NOT EXISTS mobile_accessories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
);

-- 4. Mobile Repairing Services Table
CREATE TABLE IF NOT EXISTS mobile_repairing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_name VARCHAR(255) NOT NULL,
  description TEXT,
  price_range VARCHAR(100),
  estimated_time VARCHAR(100),
  brand_compatibility TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user
-- Password: admin123 (bcrypt hashed)
INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', '$2b$10$rKZXvEX3WV7qGQxGGX5fLOQYxK5pYK5YXYqGQxGGX5fLOQYxK5pYK') 
ON CONFLICT (username) DO NOTHING;

-- Sample CSC Services
INSERT INTO csc_services (name, description, category) VALUES
('Aadhaar Services', 'Aadhaar enrollment, update, and printing services', 'Government'),
('PAN Card Services', 'New PAN card application and corrections', 'Government'),
('Voter ID Services', 'Voter ID enrollment and corrections', 'Government'),
('Passport Services', 'Passport application assistance', 'Government'),
('Bill Payment', 'Electricity, water, gas bill payments', 'Utilities'),
('Banking Services', 'Bank account opening, deposits, withdrawals', 'Banking'),
('Insurance Services', 'Life and general insurance services', 'Insurance'),
('Exam Forms', 'Online examination form filling', 'Education')
ON CONFLICT DO NOTHING;

-- Sample Mobile Accessories
INSERT INTO mobile_accessories (name, brand, description, price, category) VALUES
('Tempered Glass', 'Generic', 'Premium quality screen protector', 199.00, 'Screen Protection'),
('Mobile Cover', 'Generic', 'Shockproof back cover', 299.00, 'Cases'),
('Fast Charger', 'Generic', '33W fast charging adapter', 599.00, 'Chargers'),
('USB Cable', 'Generic', 'Type-C fast charging cable', 199.00, 'Cables'),
('Earphones', 'Generic', 'Wired earphones with mic', 399.00, 'Audio'),
('Power Bank', 'Generic', '10000mAh portable charger', 999.00, 'Power')
ON CONFLICT DO NOTHING;

-- Sample Mobile Repairing Services
INSERT INTO mobile_repairing (service_name, description, price_range, estimated_time) VALUES
('Screen Replacement', 'LCD/OLED screen replacement for all brands', '₹1500 - ₹8000', '1-2 hours'),
('Battery Replacement', 'Original battery replacement', '₹800 - ₹2500', '30 mins'),
('Charging Port Repair', 'Charging port cleaning/replacement', '₹300 - ₹1200', '1 hour'),
('Water Damage Repair', 'Complete water damage treatment', '₹1000 - ₹5000', '2-3 days'),
('Software Update', 'OS update and software troubleshooting', '₹200 - ₹500', '30 mins'),
('Back Panel Replacement', 'Back glass/panel replacement', '₹500 - ₹3000', '1 hour')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_csc_services_category ON csc_services(category);
CREATE INDEX IF NOT EXISTS idx_csc_services_active ON csc_services(is_active);
CREATE INDEX IF NOT EXISTS idx_accessories_category ON mobile_accessories(category);
CREATE INDEX IF NOT EXISTS idx_accessories_active ON mobile_accessories(is_active);
CREATE INDEX IF NOT EXISTS idx_repairing_active ON mobile_repairing(is_active);
