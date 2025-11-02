# Quick Start: Deploy to Render

## ✅ Pre-Deployment Checklist

1. ✅ Backend uses environment variables for PORT and MongoDB
2. ✅ Frontend environment files created
3. ✅ Services updated to use environment API URL
4. ✅ Backend configured to serve static frontend files
5. ✅ render.yaml configuration file created

## 🚀 Deploy in 3 Steps

### Step 1: Push to Git
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### Step 2: Connect to Render
1. Go to [render.com](https://render.com) and sign in
2. Click "New +" → "Blueprint"
3. Connect your Git repository
4. Render will detect `render.yaml` automatically

### Step 3: Set Environment Variable
1. In Render dashboard, go to your service
2. Go to "Environment" tab
3. Add environment variable:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://stylehub_user:stylehub_user@stylehub.fmxjjhd.mongodb.net/stylehub?retryWrites=true&w=majority&appName=stylehub`

That's it! Render will automatically build and deploy your app.

## 📍 What Changed

### Backend (`stylehub_fullstack_complete/backend/index.js`)
- Uses `process.env.PORT` (Render auto-sets this)
- Uses `process.env.MONGODB_URI` for database connection
- Serves static files from `frontend/dist/browser`
- Handles Angular routing

### Frontend
- Created `src/environments/environment.ts` (dev)
- Created `src/environments/environment.prod.ts` (production)
- Updated services to use environment API URL
- Configured `angular.json` for production builds

### Deployment Files
- `render.yaml` - Render deployment configuration
- `RENDER_DEPLOYMENT.md` - Detailed deployment guide

## 🔍 Verify Deployment

After deployment:
1. Visit your Render URL (e.g., `https://stylehub-app.onrender.com`)
2. Check that frontend loads correctly
3. Test API endpoints (e.g., `/api/outfits`)
4. Test authentication (login/signup)

## ⚠️ Important Notes

- **Free tier**: Render free tier spins down after 15 minutes of inactivity
- **Database**: MongoDB Atlas is external, ensure network access is configured
- **Build time**: First build may take 5-10 minutes
- **CORS**: Currently allows all origins (update for production security if needed)

## 📚 Need More Help?

See `RENDER_DEPLOYMENT.md` for detailed documentation.

