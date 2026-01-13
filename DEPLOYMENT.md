# StellarStep Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (for frontend) - https://vercel.com
- Render account (for backend) - https://render.com
- MongoDB Atlas account (for database)

## Backend Deployment (Render)

1. **Sign in to Render**: Go to https://render.com and sign in with your GitHub account

2. **Create a New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `9059Rohith/stellarstep`
   - Configure the service:
     - **Name**: `stellarstep-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free

3. **Add Environment Variables**:
   - Go to "Environment" tab
   - Add these variables:
     ```
     PORT=5000
     MONGODB_URI=<your_mongodb_connection_string>
     GROQ_API_KEY=<your_groq_api_key>
     ```

4. **Deploy**: Click "Create Web Service"
   - Note the deployed URL (e.g., `https://stellarstep-backend.onrender.com`)

## Frontend Deployment (Vercel)

1. **Sign in to Vercel**: Go to https://vercel.com and sign in with your GitHub account

2. **Import Project**:
   - Click "Add New" → "Project"
   - Import `9059Rohith/stellarstep` repository

3. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variables**:
   - Go to "Settings" → "Environment Variables"
   - Add:
     ```
     VITE_API_URL=<your_render_backend_url>
     ```
   - Replace `<your_render_backend_url>` with your Render backend URL

5. **Deploy**: Click "Deploy"
   - Your app will be live at a URL like: `https://stellarstep-xyz.vercel.app`

## Quick Deploy Commands

If you prefer using CLI:

### Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

### Update Backend URL
After deploying backend, update the frontend environment variable:
```bash
# In frontend directory
vercel env add VITE_API_URL
# Enter your backend URL when prompted
vercel --prod
```

## Alternative: Deploy Both on Render

If you prefer to use Render for both:

1. Deploy backend as above
2. Deploy frontend as a Static Site:
   - Click "New +" → "Static Site"
   - Connect repository
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - Add environment variables

## Post-Deployment

1. Test all features:
   - Landing page loads
   - Dashboard is accessible
   - All game pages work
   - API calls succeed

2. Update CORS in backend if needed:
   - Add your Vercel domain to allowed origins in `server.js`

## Troubleshooting

- **Frontend can't connect to backend**: Check VITE_API_URL environment variable
- **Backend crashes**: Check environment variables are set correctly
- **CORS errors**: Update CORS settings in backend/server.js
- **Build fails**: Check all dependencies are in package.json

## Free Tier Limitations

- **Render**: Service sleeps after 15 min of inactivity, first request may be slow
- **Vercel**: 100GB bandwidth/month, perfect for small apps
- **MongoDB Atlas**: 512MB storage on free tier

Your app is now live! 🚀
