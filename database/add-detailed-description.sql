-- Migration: Add detailed_description column to csc_services table
-- Run this SQL in your Neon PostgreSQL database console

ALTER TABLE csc_services 
ADD COLUMN IF NOT EXISTS detailed_description TEXT;

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'csc_services';
