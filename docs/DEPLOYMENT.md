# Deployment Guide

This guide covers all deployment options for Skillhub.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Vercel Deployment](#vercel-deployment)
- [Netlify Deployment](#netlify-deployment)
- [Docker Deployment](#docker-deployment)
- [Manual Deployment](#manual-deployment)
- [Post-Deployment Checklist](#post-deployment-checklist)

## Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- Git repository set up
- Environment variables configured (see below)

## Environment Variables

Create a `.env` file in the root directory:

```env
# Required
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional
VITE_MAPBOX_TOKEN=your_mapbox_access_token
VITE_SENTRY_DSN=your_sentry_dsn
VITE_ANALYTICS_ID=your_analytics_id
```

**Important:** Never commit `.env` files to version control. Use your platform's environment variable management.

## Vercel Deployment

### Automatic Deployment (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Deploy
   vercel
   ```

2. **Configure Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all required environment variables
   - Redeploy after adding variables

3. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the dist folder
vercel --prod
```

## Netlify Deployment

### Automatic Deployment

1. **Connect Repository**
   - Go to Netlify Dashboard
   - Click "New site from Git"
   - Select your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

2. **Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add all required environment variables
   - Redeploy the site

3. **Custom Domain**
   - Go to Domain Settings
   - Add your custom domain
   - Update DNS records as instructed

### Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## Docker Deployment

### Local Development

```bash
# Start development environment
docker-compose up app-dev

# Access at http://localhost:5173
```

### Production Deployment

```bash
# Build Docker image
docker build -t skillhub:latest .

# Run container
docker run -d \
  -p 80:80 \
  -e VITE_SUPABASE_URL=your_url \
  -e VITE_SUPABASE_ANON_KEY=your_key \
  --name skillhub \
  skillhub:latest
```

### Docker Compose Production

```bash
# Build and start
docker-compose up -d app

# View logs
docker-compose logs -f app

# Stop
docker-compose down
```

### Push to Container Registry

```bash
# Tag image
docker tag skillhub:latest your-registry/skillhub:latest

# Push to registry
docker push your-registry/skillhub:latest
```

## Manual Deployment

### Build and Upload

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload dist folder**
   - Upload the contents of the `dist` folder to your web server
   - Ensure proper file permissions
   - Configure web server for SPA routing

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/skillhub/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Apache Configuration

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /var/www/skillhub/dist

    <Directory /var/www/skillhub/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

## Post-Deployment Checklist

### Security
- [ ] HTTPS is enabled
- [ ] Security headers are configured
- [ ] Environment variables are set
- [ ] No sensitive data in client-side code
- [ ] CORS is properly configured

### Performance
- [ ] Assets are compressed (gzip/brotli)
- [ ] Static assets have cache headers
- [ ] Images are optimized
- [ ] Bundle size is reasonable (< 200KB gzipped)
- [ ] Lighthouse score > 90

### Functionality
- [ ] All routes work correctly
- [ ] Authentication works
- [ ] API calls succeed
- [ ] Forms submit correctly
- [ ] Error handling works
- [ ] Mobile responsiveness verified

### Monitoring
- [ ] Error tracking is configured
- [ ] Analytics are set up
- [ ] Uptime monitoring is active
- [ ] Performance monitoring is active
- [ ] Logging is configured

### SEO
- [ ] Meta tags are correct
- [ ] Open Graph tags are set
- [ ] Sitemap is generated
- [ ] Robots.txt is configured
- [ ] Canonical URLs are set

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules dist
npm ci
npm run build
```

### Environment Variables Not Loading
- Check variable names start with `VITE_`
- Restart development server after changes
- Verify variables are set in production environment

### Routing Issues
- Ensure SPA routing is configured on server
- Check that all routes redirect to index.html
- Verify base URL is correct in vite.config.ts

### Performance Issues
- Run `npm run build` and check bundle size
- Use `npm run preview` to test production build locally
- Check for large dependencies
- Enable code splitting if needed

## Support

For deployment issues:
- Check the [RELEASE.md](./RELEASE.md) for known limitations
- Review [README.md](./README.md) for setup instructions
- Open an issue on GitHub

---

**Last Updated:** 2024
**Version:** 1.0.0
