# Quick Deployment Guide

## 🚀 Deploy in 5 Minutes

### Option 1: First Time Deployment

```bash
# 1. Initialize Git (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit: Portfolio website"

# 4. Create repository on GitHub named: yourusername.github.io

# 5. Add remote (replace 'yourusername' with your GitHub username)
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# 6. Push to GitHub
git branch -M main
git push -u origin main

# 7. Enable GitHub Pages in repo Settings > Pages > Source: main branch
```

Your site will be live at: `https://yourusername.github.io`

### Option 2: Updating Existing Site

```bash
# 1. Edit data.json with your changes

# 2. Stage changes
git add .

# 3. Commit with description
git commit -m "Updated projects and experience"

# 4. Push
git push
```

Website updates automatically in 1-2 minutes!

## 🌍 Custom Domain Setup (Optional)

### Quick DNS Configuration

**For domain registrar (Namecheap, GoDaddy, etc.):**

Add these A records for your apex domain:
```
Host: @
Value: 185.199.108.153

Host: @
Value: 185.199.109.153

Host: @
Value: 185.199.110.153

Host: @
Value: 185.199.111.153
```

Add CNAME for www subdomain:
```
Host: www
Value: yourusername.github.io
```

**In GitHub:**
1. Settings > Pages > Custom domain
2. Enter: `yourdomain.com`
3. Save
4. Wait 5 minutes, then check "Enforce HTTPS"

DNS propagation takes 1-24 hours.

## 📝 Before You Deploy

- [ ] Update `data.json` with your real information
- [ ] Replace email in contact section
- [ ] Add your LinkedIn and GitHub URLs
- [ ] Update project descriptions
- [ ] Add video links (if available)
- [ ] Update experience section
- [ ] Add your publications
- [ ] Test locally by opening `index.html` in browser

## 🎯 Cost Breakdown

- GitHub Pages hosting: **FREE** ✅
- Custom domain: **~10 EUR/year** (optional)
- Total annual cost: **10 EUR/year** (domain only)

## ✅ Post-Deployment Checklist

1. [ ] Visit your site: `https://yourusername.github.io`
2. [ ] Test all navigation links
3. [ ] Verify content loads from data.json
4. [ ] Test on mobile device
5. [ ] Check all external links work
6. [ ] Verify contact email is correct
7. [ ] Share your portfolio! 🎉

## 🆘 Common Issues

**Issue:** Site shows 404
- **Fix:** Wait 5-10 minutes after first push. Check GitHub Pages is enabled.

**Issue:** Content not updating
- **Fix:** Clear browser cache (Ctrl+F5). Verify data.json syntax at jsonlint.com

**Issue:** Styling broken
- **Fix:** Ensure all files (index.html, style.css, script.js) are in root directory

## 📞 Need Help?

Check the main [README.md](README.md) for detailed instructions.

---

**Pro Tip:** Bookmark your GitHub repository for easy access when updating!

