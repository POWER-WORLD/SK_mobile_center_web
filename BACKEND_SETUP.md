# 🚀 SK Mobile Center - Backend Setup Guide

## 📋 Overview
Complete backend setup for SK Mobile Center using:
- **Database**: Neon PostgreSQL (serverless)
- **Backend**: Netlify Functions (serverless)
- **Auth**: JWT-based admin authentication
- **Frontend**: React + Vite

---

## 🔧 STEP 1: Initialize Database

### Run the database initialization script:

```bash
node database/init-db.js
```

This will:
✅ Create all required tables
✅ Set up admin user (username: `admin`, password: `admin123`)
✅ Insert sample data for CSC services, accessories, and repair services

**Output you should see:**
```
✅ Connected to Neon PostgreSQL
✅ Database tables created
✅ Admin user created:
   Username: admin
   Password: admin123
   (Change password after first login)
📊 Database Statistics:
   CSC Services: 8
   Mobile Accessories: 6
   Mobile Repairing: 6
🎉 Database initialization complete!
```

---

## ⚙️ STEP 2: Set Up Netlify Environment Variables

Go to your Netlify dashboard:
**Netlify Dashboard → Site Settings → Environment Variables**

Add these variables:

### 1. DATABASE_URL
```
postgresql://neondb_owner:npg_aCg4Lch0WiFD@ep-square-field-ae50wkxs-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 2. JWT_SECRET
```
sk-mobile-jwt-secret-key-2026-change-this-in-production
```

**Important:** For production, generate a secure random JWT secret:
```bash
openssl rand -base64 32
```

---

## 📁 Backend Structure

```
netlify/
  functions/
    utils/
      db.js           # Database connection pool
      auth.js         # JWT authentication & middleware
    admin-login.js    # POST /admin/login
    csc-services.js   # GET/POST/PUT/DELETE CSC services
    mobile-accessories.js  # GET/POST/PUT/DELETE accessories
    mobile-repairing.js    # GET/POST/PUT/DELETE repair services
```

---

## 🔐 API Endpoints

### Public Endpoints (No Auth Required)

#### Get CSC Services
```
GET /.netlify/functions/csc-services
Response: { services: [...] }
```

#### Get Mobile Accessories
```
GET /.netlify/functions/mobile-accessories
Response: { accessories: [...] }
```

#### Get Mobile Repairing Services
```
GET /.netlify/functions/mobile-repairing
Response: { services: [...] }
```

---

### Admin Endpoints (Auth Required)

#### Admin Login
```
POST /.netlify/functions/admin-login
Body: { username: "admin", password: "admin123" }
Response: { success: true, token: "jwt-token", user: {...} }
```

#### Create CSC Service
```
POST /.netlify/functions/csc-services
Headers: { Authorization: "Bearer <token>" }
Body: { name: "...", description: "...", category: "..." }
```

#### Update CSC Service
```
PUT /.netlify/functions/csc-services
Headers: { Authorization: "Bearer <token>" }
Body: { id: "uuid", name: "...", is_active: true }
```

#### Delete CSC Service
```
DELETE /.netlify/functions/csc-services?id=<uuid>
Headers: { Authorization: "Bearer <token>" }
```

*(Same pattern for mobile-accessories and mobile-repairing)*

---

## 🛡️ Security Features

✅ **Password Hashing**: Admin passwords stored with bcrypt (10 rounds)
✅ **JWT Authentication**: 7-day expiry tokens
✅ **CORS Protection**: Configured for Netlify deployment
✅ **SQL Injection Prevention**: Parameterized queries
✅ **No Direct DB Access**: Frontend only calls Netlify Functions
✅ **Environment Secrets**: DATABASE_URL and JWT_SECRET in Netlify env vars

---

## 📊 Database Schema

### Tables Created:
1. **admin_users** - Admin login credentials
2. **csc_services** - CSC/Jan Seva services
3. **mobile_accessories** - Mobile accessories with prices
4. **mobile_repairing** - Mobile repair services

See `database/schema.sql` for full schema.

---

## 🔄 How to Change Admin Password

### Option 1: Via SQL
Connect to Neon and run:
```sql
UPDATE admin_users 
SET password_hash = crypt('new_password', gen_salt('bf')) 
WHERE username = 'admin';
```

### Option 2: Re-run init script
Edit `database/init-db.js`, change the password, and run:
```bash
node database/init-db.js
```

---

## 🚀 Deploy to Netlify

1. **Push code to Git**
```bash
git add .
git commit -m "Add backend with Netlify Functions"
git push origin main
```

2. **Netlify will auto-deploy** (if connected to Git)

3. **Verify environment variables** are set in Netlify dashboard

4. **Test the login**:
```bash
curl -X POST https://skgmobile.netlify.app/.netlify/functions/admin-login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

---

## 📞 Frontend Integration

Your React frontend should call APIs like this:

```javascript
// Login
const response = await fetch('/.netlify/functions/admin-login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
});
const { token } = await response.json();
localStorage.setItem('adminToken', token);

// Authenticated request
const token = localStorage.getItem('adminToken');
const response = await fetch('/.netlify/functions/csc-services', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ name: 'New Service', ... })
});
```

---

## ✅ Checklist

- [x] Database tables created
- [x] Admin user configured
- [x] Netlify Functions created
- [ ] Environment variables set in Netlify
- [ ] Frontend updated to use backend APIs
- [ ] Admin login tested
- [ ] CRUD operations tested

---

## 🆘 Troubleshooting

### Database connection failed
- Check DATABASE_URL in Netlify environment variables
- Verify Neon database is active (not suspended)

### 401 Unauthorized errors
- Check JWT_SECRET matches between local and Netlify
- Verify token is being sent in Authorization header

### Functions not found (404)
- Ensure netlify.toml is in project root
- Check functions are in `netlify/functions/` directory
- Redeploy after adding new functions

---

**🎉 Your backend is ready! Now let's update the frontend to use these APIs.**
