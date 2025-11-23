# Local Testing Guide

## 🧪 Test Your Portfolio Before Deploying

### Method 1: Simple Browser Open (Quickest)

1. Navigate to your portfolio folder
2. Double-click `index.html`
3. Your default browser will open the site

**Limitation:** Some browsers may block `fetch()` requests to `data.json` due to CORS policy when opening files directly.

### Method 2: Using Python's Built-in Server (Recommended)

If you have Python installed:

**Python 3.x:**
```bash
python -m http.server 8000
```

**Python 2.x:**
```bash
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

### Method 3: Using Node.js HTTP Server

If you have Node.js installed:

```bash
# Install http-server globally (one-time)
npm install -g http-server

# Run server
http-server -p 8000
```

Then open: `http://localhost:8000`

### Method 4: Using VS Code Live Server

If you use Visual Studio Code:

1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## ✅ What to Test

### Functionality Tests
- [ ] All navigation links work (smooth scroll)
- [ ] Mobile menu opens/closes
- [ ] Projects load from data.json
- [ ] Udemy statistics display
- [ ] Experience section displays
- [ ] Papers section displays
- [ ] Contact links work

### Content Verification
- [ ] Name and title are correct
- [ ] Email address is correct
- [ ] LinkedIn URL works
- [ ] GitHub URL works
- [ ] Project descriptions accurate
- [ ] All tools/technologies listed

### Responsive Design Tests
- [ ] Desktop view (1920px+)
- [ ] Laptop view (1366px)
- [ ] Tablet view (768px)
- [ ] Mobile view (375px)

**Test Responsiveness:**
1. Press F12 in browser
2. Click device toolbar icon (or Ctrl+Shift+M)
3. Select different devices

### Performance Tests
- [ ] Page loads quickly
- [ ] Images load (if any)
- [ ] No console errors (F12 > Console)
- [ ] Smooth scrolling works
- [ ] Animations are smooth

## 🔍 Debugging Tips

### Check JavaScript Console

Press `F12` and look at Console tab:
- **No errors:** Everything is working ✅
- **"Failed to fetch":** CORS issue - use a local server (Method 2 or 3)
- **JSON parse error:** Check data.json syntax at jsonlint.com

### Validate Your JSON

Before testing, validate `data.json`:
1. Go to [JSONLint](https://jsonlint.com)
2. Paste your data.json content
3. Click "Validate JSON"
4. Fix any errors shown

### Test Different Browsers

- Chrome/Edge (Chromium)
- Firefox
- Safari (if on Mac)

### Check Network Tab

F12 > Network tab:
- Should see successful loads (green, status 200)
- If data.json shows 404, ensure file is in correct location

## 🎨 Making Changes

When testing locally:

1. Edit `data.json` or other files
2. Save changes
3. Refresh browser (Ctrl+R or Cmd+R)
4. For hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)

## 📱 Mobile Testing (Real Device)

### Option 1: Use Local Network

1. Start local server: `python -m http.server 8000`
2. Find your computer's IP:
   - Windows: `ipconfig` → look for IPv4
   - Mac/Linux: `ifconfig` → look for inet
3. On mobile, visit: `http://YOUR_IP:8000`

Example: `http://192.168.1.100:8000`

### Option 2: After GitHub Deployment

Simply visit your GitHub Pages URL on mobile browser.

## 🐛 Common Issues & Fixes

### Issue: data.json Not Loading

**Symptoms:**
- Sections show "Loading..." indefinitely
- Console shows CORS error

**Fix:**
- Don't open index.html directly
- Use Method 2 or 3 (Python/Node server)

### Issue: Styles Not Applying

**Symptoms:**
- Plain unstyled text
- No colors or formatting

**Fix:**
- Check `style.css` is in same folder as `index.html`
- Verify Tailwind CDN link in `<head>`
- Check browser console for errors

### Issue: Smooth Scroll Not Working

**Fix:**
- Check JavaScript loaded correctly
- Verify `script.js` is in same folder
- Look for errors in console

### Issue: Mobile Menu Not Opening

**Fix:**
- Check JavaScript console for errors
- Verify Font Awesome icons loaded
- Check mobile button has correct ID

## 📊 Performance Optimization

Before deploying, ensure:
- [ ] No large image files (compress if needed)
- [ ] No console errors or warnings
- [ ] Smooth animations on low-end devices
- [ ] Fast load time (< 3 seconds)

## ✨ Final Checklist

Before deploying to GitHub:

- [ ] Tested in local server (Method 2 or 3)
- [ ] All links work
- [ ] Content is accurate
- [ ] No console errors
- [ ] Responsive on all screen sizes
- [ ] data.json is valid JSON
- [ ] Personal information updated
- [ ] Contact links are correct

## 🚀 Ready to Deploy?

Once everything tests successfully locally:

1. Follow [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
2. Push to GitHub
3. Enable GitHub Pages
4. Share your portfolio!

---

**Remember:** Local testing is crucial. Fix all issues locally before deploying! 🎯

