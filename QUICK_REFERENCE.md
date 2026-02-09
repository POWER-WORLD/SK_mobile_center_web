# ⚡ SK Mobile Center - Quick Reference

## 🔐 Admin Login Credentials
```
URL: https://skgmobile.netlify.app/admin/login (or http://localhost:3000/admin/login for local)
Username: admin
Password: admin123
```

## 🌐 API Endpoints

### Base URL
- **Production**: `https://skgmobile.netlify.app/.netlify/functions/`
- **Local Dev**: `http://localhost:8888/.netlify/functions/`

### Available Endpoints
1. `POST /admin-login` - Admin authentication
2. `GET/POST/PUT/DELETE /csc-services` - CSC services management
3. `GET/POST/PUT/DELETE /mobile-accessories` - Accessories management
4. `GET/POST/PUT/DELETE /mobile-repairing` - Repair services management

## 📝 Environment Variables (Set in Netlify)

```env
DATABASE_URL=postgresql://neondb_owner:npg_aCg4Lch0WiFD@ep-square-field-ae50wkxs-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require

JWT_SECRET=sk-mobile-jwt-secret-key-2026-change-this-in-production
```

**Where to set:** Netlify Dashboard → Site Settings → Environment Variables

## 🚀 Deployment Commands

```bash
# 1. Initialize database (already done ✅)
npm run init-db

# 2. Test locally (optional)
netlify dev

# 3. Deploy to production
git add .
git commit -m "Deploy backend"
git push origin main
```

## 📊 Database Tables

1. **admin_users** - Admin authentication
2. **csc_services** - CSC/Jan Seva services (8 entries)
3. **mobile_accessories** - Mobile accessories (6 entries)
4. **mobile_repairing** - Repair services (6 entries)

## 🛠️ Useful Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Re-initialize database
npm run init-db

# Test locally with Netlify functions
netlify dev
```

## 📞 Support Resources

- **Detailed Guide**: See `DEPLOYMENT_GUIDE.md`
- **Backend API Docs**: See `BACKEND_SETUP.md`
- **Neon Console**: https://console.neon.tech
- **Netlify Dashboard**: https://app.netlify.com

## ✅ Next Steps

1. **Set environment variables in Netlify** (DATABASE_URL + JWT_SECRET)
2. **Deploy**: `git push origin main`
3. **Test login** at https://skgmobile.netlify.app/admin/login
4. **Verify CRUD operations** in admin dashboard

---
**Status**: ✅ Database initialized | ⏳ Waiting for Netlify env vars + deployment
