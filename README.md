# CinePick PWA - Setup & Deployment Guide

## 🎬 What You Have

CinePick is now a **Progressive Web App (PWA)** with the following features:

### Core PWA Features
- ✅ **Installable** - Install as a native-looking app on any device
- ✅ **Offline Support** - Works completely offline with cached data
- ✅ **App Shell** - Loads instantly from cache
- ✅ **Responsive Design** - Perfect on mobile, tablet, and desktop
- ✅ **Native Feel** - Full-screen mode, splash screens, status bar integration
- ✅ **Web App Shortcuts** - Quick actions from home screen

### Technical Highlights
- **Service Worker** - Advanced caching strategies (Network-first for APIs, Cache-first for assets)
- **Smart Caching** - Automatically caches movie data and API responses
- **Offline Mode** - All local features work without internet
- **Background Sync** - Ready for future server sync features
- **Push Notifications** - Infrastructure for notification support
- **Modern Aesthetics** - Premium design with gradient text, glass-morphism, smooth animations

---

## 📦 Files Included

```
cinepick-pwa/
├── index.html           # Main app (includes all HTML/CSS/JS)
├── manifest.json        # PWA manifest with metadata and icons
├── sw.js               # Service Worker for offline support
└── README.md           # This file
```

---

## 🚀 Deployment Options

### Option 1: Simple Local Testing (Quick Start)

1. **Create a folder** on your computer
2. **Place the three files** in this folder:
   - `index.html`
   - `manifest.json`
   - `sw.js`

3. **Use a local server** (choose one):

   **Python 3:**
   ```bash
   python -m http.server 8000
   ```

   **Python 2:**
   ```bash
   python -m SimpleHTTPServer 8000
   ```

   **Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

   **Node.js (built-in):**
   ```bash
   node -e "require('http').createServer((req,res)=>require('fs').readFile('.' + (req.url==='/'?'/index.html':req.url), (e,d)=>res.end(e?'Not Found':d))).listen(8000)"
   ```

4. **Open browser** to `http://localhost:8000`
5. **On mobile**, open in browser and look for "Install" or "Add to Home Screen" option

---

### Option 2: GitHub Pages (Free Hosting)

GitHub Pages hosts PWAs perfectly and supports HTTPS (required for PWAs).

#### Steps:

1. **Create a GitHub account** (if you don't have one)
   
2. **Create a new repository**:
   - Go to github.com/new
   - Name: `cinepick` (or your preference)
   - Make it Public
   - Click "Create repository"

3. **Upload files**:
   - Click "Add file" → "Upload files"
   - Select all three files (index.html, manifest.json, sw.js)
   - Commit changes

4. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Choose: branch: `main`, folder: `/ (root)`
   - Save

5. **Access your PWA**:
   - Your app will be at: `https://YOUR_USERNAME.github.io/cinepick`
   - You can now install it on any device!

**To use a custom domain:**
- In Settings → Pages, add your domain
- Update DNS records at your domain provider (GitHub provides instructions)

---

### Option 3: Netlify (Recommended for PWAs)

Netlify has excellent PWA support with automatic HTTPS and CDN.

#### Steps:

1. **Go to netlify.com** and sign up

2. **Drag & drop deployment**:
   - Click "Deploy"
   - Drag your three files into the drop zone
   - Done! Your app is live with HTTPS

3. **Or Git deployment** (recommended):
   - Push files to GitHub
   - Click "New site from Git"
   - Connect GitHub repo
   - Choose branch: `main`
   - Deploy!

4. **Custom domain**:
   - In Site settings → Domain management
   - Add your custom domain
   - Follow DNS instructions

---

### Option 4: Vercel (Zero-Config Deployment)

Vercel is made by the Nextjs team and has perfect PWA support.

#### Steps:

1. **Go to vercel.com** and sign up

2. **Create vercel.json** (add to your repo):
   ```json
   {
     "buildCommand": "true"
   }
   ```

3. **Push to GitHub**, connect repo to Vercel

4. **Auto-deploys** on every push to main

---

### Option 5: Traditional Web Server (Full Control)

For complete control, use any traditional web hosting:

#### Requirements:
- ✅ HTTPS (required for PWAs)
- ✅ CORS enabled for APIs
- ✅ Service Worker support
- ✅ Proper MIME types configured

#### Popular hosts:
- **DigitalOcean** - $4-6/month
- **AWS S3 + CloudFront** - Pay-per-use
- **Linode** - $5/month
- **Bluehost/SiteGround** - $5-10/month

**Setup:**
1. Upload files via FTP/SFTP
2. Ensure HTTPS is enabled
3. Configure MIME types:
   - `.json` → `application/json`
   - `.js` → `application/javascript`
   - `.html` → `text/html`
4. Access your app!

---

## ✅ Testing Your PWA

### Desktop (Chrome/Edge)
1. Open app in browser
2. Click **address bar** → **Install** button
3. App installs to start menu/applications

### Mobile (iOS)
1. Open in **Safari**
2. Tap **Share** → **Add to Home Screen**
3. Tap app on home screen to use

### Mobile (Android)
1. Open in **Chrome**
2. Look for **"Install"** prompt at bottom
3. Or: Menu → **"Install app"**
4. Tap on home screen to launch

### Check Service Worker
1. Open DevTools (F12)
2. Go to **Application** tab
3. Click **Service Workers** in left sidebar
4. Should show `sw.js` as "Active"
5. Offline box should be checked to test offline mode

### Check Cache
1. DevTools → **Application** tab
2. Click **Cache Storage** in left sidebar
3. Expand cache names to see cached files:
   - `cinepick-v1` - Static assets
   - `cinepick-runtime-v1` - Runtime resources
   - `cinepick-api-v1` - API responses

---

## 🎯 Features & Usage

### Adding Movies
- **Single add**: Type title, select version from results
- **Bulk add**: Paste multiple movies (one per line)
- **Import file**: Upload .txt file with movie list
- **Works offline**: Adds movies to local storage immediately

### Picking a Movie
- Click **"Pick Movie"** button
- App selects random movie with animation
- Shows detailed info: poster, ratings, cast, plot
- Link to IMDb available
- *Works offline with previously fetched data*

### Managing Your List
- **Search**: Filter movies in real-time
- **Remove**: Delete individual movies with undo
- **Clear all**: Remove entire list (with confirmation)
- **Undo**: Restore deleted movies (up to 10 deletions)

### Backup & Restore
- **Download**: Export as JSON or .txt file
- **Restore**: Upload backup file to restore movies
- **Works offline**: All backups stored locally

---

## 🔧 Advanced Customization

### Change Colors
In `index.html`, find the `:root` section (around line 28):

```css
:root {
  --primary: #e50914;        /* Netflix red - change this */
  --primary-dark: #b20710;   /* Darker red */
  --bg-dark: #0f0f0f;        /* Dark background */
  /* ... other colors ... */
}
```

Change `#e50914` to any hex color:
- `#1DB954` - Spotify green
- `#0EA5E9` - Sky blue
- `#A855F7` - Purple
- `#EC4899` - Pink

### Change App Name/Description
In `manifest.json`:
```json
{
  "name": "CinePick - Movie Randomizer",
  "short_name": "CinePick",
  "description": "Never wonder what to watch again...",
  "theme_color": "#e50914"
}
```

### Change OMDb API Key
In `index.html` (line ~225):
```javascript
const API_KEY = "c8520fd6";  // Get free key at omdbapi.com
```

The current key has limited daily requests. Get your free key:
1. Go to http://www.omdbapi.com/apikey.aspx
2. Choose free tier
3. Confirm via email
4. Copy your key and replace in code

---

## 📱 App Icons & Splashscreens

The app currently uses SVG icons (rendering in real-time). To use custom images:

1. **Create icons** (transparent background):
   - 192x192px - Regular icon
   - 512x512px - Large icon
   - 192x192px masked - Maskable icon (rounded)

2. **Upload to your server**

3. **Update manifest.json**:
```json
"icons": [
  {
    "src": "/images/icon-192.png",
    "sizes": "192x192",
    "type": "image/png"
  },
  {
    "src": "/images/icon-512.png",
    "sizes": "512x512",
    "type": "image/png"
  }
]
```

---

## 🚨 Troubleshooting

### "Install button not showing"
- Must be on **HTTPS** (localhost works)
- Service Worker must be registered
- Check DevTools → Application → Service Workers

### "Works offline but shows blank screen"
- Check Service Worker cache (DevTools → Application → Cache Storage)
- Ensure files are being cached properly
- Try hard refresh (Ctrl+Shift+R)

### "API not working"
- Check API key validity in code
- Verify OMDb API account is active
- Check daily request limit (free tier: 1,000/day)
- Get cache working offline (previously loaded data)

### "Can't install on iOS"
- Must use **Safari** (not Chrome on iOS)
- Go to Share → Add to Home Screen
- Ensure HTTPS is enabled

### "App won't update after changes"
- Service Worker caches files
- Hard refresh (Ctrl+Shift+R)
- Or: DevTools → Application → Service Workers → Unregister
- Redeploy site

---

## 📊 Performance Tips

### Optimize further:
1. **Compress images** - Use image compression tools
2. **Minify code** - Remove spaces/comments
3. **Use CDN** - Serve assets globally
4. **Add Web Fonts** - Load custom fonts asynchronously
5. **Optimize API** - Cache more aggressive

### Monitor performance:
- **Lighthouse** (DevTools → Lighthouse)
- **PageSpeed Insights** - pagespeed.web.dev
- **WebPageTest** - webpagetest.org

---

## 📝 API Information

### OMDb API (Movie Data)
- **Free Tier**: 1,000 requests/day
- **Paid**: $9.99/month for 100,000 requests
- **Sign up**: http://www.omdbapi.com/apikey.aspx
- **Docs**: http://www.omdbapi.com/

The app uses:
- Search endpoint for finding movies
- Title endpoint for detailed info
- Caches all responses for offline use

---

## 🔐 Privacy & Security

- **Local storage only** - No server stores your data
- **No tracking** - No analytics or ads
- **No personal data** - Only your movie list is stored
- **Open source** - All code visible and auditable
- **API calls** - Only to OMDb (read-only)

---

## 🎓 Learning Resources

- **PWA Basics**: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
- **Service Workers**: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- **Web App Manifest**: https://developer.mozilla.org/en-US/docs/Web/Manifest
- **Caching Strategies**: https://developer.chrome.com/docs/workbox/caching-strategies-overview/

---

## 🚀 Next Steps

### Future Enhancements:
- [ ] Add ratings/reviews
- [ ] Watchlist with streaming providers
- [ ] Social sharing
- [ ] Dark/light theme toggle
- [ ] Genre filtering
- [ ] Watch history tracking
- [ ] Server sync for multiple devices
- [ ] Notifications for new releases
- [ ] IMDb integration (ratings)
- [ ] Trailer playback

### Want to contribute?
- Fork the repo
- Make improvements
- Submit pull requests
- Share feedback!

---

## 📄 License

This project is free to use and modify. No restrictions!

---

## 🎉 Enjoy!

Your PWA is ready to deploy. Pick any deployment option above and you're live!

**Questions?** The code is well-commented and designed to be modified. Enjoy your movie randomizer!

🎬 **CinePick** - Never wonder what to watch again.
