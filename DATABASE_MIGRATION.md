# Database Migration Guide

## Adding Detailed Description to CSC Services

### Step 1: Run the Migration SQL

You need to add a new `detailed_description` column to the existing `csc_services` table in your Neon PostgreSQL database.

**Option A: Run via Neon Console**
1. Go to your Neon Dashboard: https://console.neon.tech
2. Select your project
3. Click "SQL Editor"
4. Copy and paste the SQL from `database/add-detailed-description.sql`
5. Click "Run" to execute

**Option B: Run via Command Line**
```bash
psql "postgresql://neondb_owner:npg_aCg4Lch0WiFD@ep-square-field-a-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require" -f database/add-detailed-description.sql
```

### Step 2: Verify the Migration

After running the migration, verify the column was added:
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'csc_services'
ORDER BY ordinal_position;
```

You should see `detailed_description` with type `text` in the list.

### Step 3: Update Existing Services (Optional)

You can now add detailed descriptions to your existing services via the Admin Panel:

1. Login to `/admin/login`
2. Go to "CSC Services"
3. Edit any service
4. Fill in the "Detailed Description" textarea with:
   - Multiple paragraphs (separated by blank lines)
   - Bullet points using `•` or `-` at the start of lines
   - Any formatting you need

### Example Detailed Description Format

```
This service allows you to apply for or update your Aadhaar card details online.

What you need:
• Valid mobile number
• Residential proof
• Identity proof
• Recent photograph

Processing time: 2-3 working days

Benefits:
- No need to visit government offices
- Track application status online
- Receive confirmation via SMS
```

## What Changed

### Backend Updates
- ✅ Database schema updated with `detailed_description` column
- ✅ Netlify Functions updated to handle new field (create/update)
- ✅ Migration SQL file created

### Frontend Updates
- ✅ Admin panel updated with detailed description textarea (8 rows)
- ✅ ServiceDetailModal component created
- ✅ CSCServicesPage updated with modal integration
- ✅ "Details" button now opens modal with full service information
- ✅ Proper formatting for paragraphs and bullet points

### AdminForm Enhancement
- ✅ Now supports custom `rows` and `placeholder` attributes for textareas

## Testing

1. **Admin Side**: Create or edit a CSC service and add detailed description
2. **Public Side**: Click "Details →" button on any service card
3. **Modal**: Verify the detailed description shows with proper formatting
