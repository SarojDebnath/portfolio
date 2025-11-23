# Portfolio Website - Saroj Debnath

A modern, responsive portfolio website built with HTML, CSS (Tailwind), and JavaScript. Designed for GitHub Pages deployment with dynamic content management through a JSON configuration file.

## 🚀 Features

- ✅ Fully static website (no backend required)
- ✅ GitHub Pages compatible
- ✅ Custom domain ready
- ✅ Dynamic content via JSON configuration
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Modern tech aesthetic
- ✅ SEO optimized

## 📁 File Structure

```
portfolio/
├── index.html          # Main HTML file
├── style.css           # Custom CSS styles
├── script.js           # JavaScript for dynamic content
├── data.json           # **Edit this file to update content**
└── README.md           # This file
```

## 🎯 Updating Your Portfolio Content

All portfolio content is managed through the `data.json` file. Simply edit this file and push to GitHub to update your website.

### Editing Projects

To add, remove, or modify projects, edit the `projects` array in `data.json`:

```json
{
  "projects": [
    {
      "title": "Your Project Title",
      "description": "Detailed description of your project",
      "tools": ["Python", "TensorFlow", "OpenCV"],
      "videoUrl": "https://youtube.com/your-video",
      "githubUrl": "https://github.com/your-repo"
    }
  ]
}
```

**Fields:**
- `title`: Project name (required)
- `description`: Brief description (required)
- `tools`: Array of technologies used (required)
- `videoUrl`: Link to demo video (optional, leave empty string if none)
- `githubUrl`: Link to GitHub repository (optional)

### Updating Udemy Statistics

Edit the `udemy` section:

```json
{
  "udemy": {
    "totalHours": 120,
    "totalStudents": 15000,
    "engagement": "85%",
    "feedback": ["feedback1.jpg", "feedback2.jpg"]
  }
}
```

**Note:** Place feedback screenshot images in the same directory as your HTML file.

### Updating Experience

Edit the `experience` array:

```json
{
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "duration": "2020 - Present",
      "description": "Brief job description",
      "highlights": [
        "Achievement 1",
        "Achievement 2"
      ]
    }
  ]
}
```

### Updating Publications/Papers

Edit the `papers` array:

```json
{
  "papers": [
    {
      "title": "Paper Title",
      "authors": "Author Names",
      "venue": "Conference/Journal Name",
      "year": "2023",
      "abstract": "Brief abstract",
      "url": "https://link-to-paper.com"
    }
  ]
}
```

### Updating Contact Information

Edit the `contact` section:

```json
{
  "contact": {
    "email": "your.email@example.com",
    "linkedin": "https://www.linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername"
  }
}
```

### Customizing Hero Section

Edit the `hero` section:

```json
{
  "hero": {
    "intro": "Your introduction text here"
  }
}
```

**Note:** Your name and subtitle are in `index.html` and can be changed by editing the HTML directly.

## 🌐 Deploying to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the `+` icon in the top right corner
3. Select "New repository"
4. Name it: `yourusername.github.io` (replace `yourusername` with your GitHub username)
   - **Important:** For a user site, the repo MUST be named `yourusername.github.io`
   - For a project site, you can use any name
5. Make it Public
6. Click "Create repository"

### Step 2: Push Your Code

Open terminal/command prompt in your portfolio folder and run:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial portfolio commit"

# Add remote repository (replace 'yourusername')
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "main" branch
5. Click "Save"
6. Your site will be live at `https://yourusername.github.io` in a few minutes!

## 🔄 Updating Your Website

After making changes to `data.json` or any other files:

```bash
# Stage changes
git add .

# Commit with a message describing changes
git commit -m "Updated projects section"

# Push to GitHub
git push
```

Your website will automatically update within 1-2 minutes!

## 🌍 Setting Up a Custom Domain

### Cost: ~10 EUR/year

You can purchase a domain from:
- [Namecheap](https://www.namecheap.com) - ~$10/year
- [Google Domains](https://domains.google) - ~$12/year
- [Cloudflare](https://www.cloudflare.com/products/registrar/) - At-cost pricing (~$8-10/year)

### Connecting Your Domain to GitHub Pages

#### Step 1: Add Custom Domain to GitHub

1. In your GitHub repository, go to "Settings" > "Pages"
2. Under "Custom domain", enter your domain (e.g., `sarojdebnath.com`)
3. Click "Save"
4. Check "Enforce HTTPS" (wait a few minutes after adding domain)

#### Step 2: Configure DNS Settings

Go to your domain registrar's DNS settings and add these records:

**For apex domain (example.com):**

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

**For www subdomain (www.example.com):**

```
Type: CNAME
Name: www
Value: yourusername.github.io
```

**Note:** DNS changes can take up to 48 hours to propagate, but usually work within a few hours.

#### Step 3: Create CNAME File (GitHub will do this automatically)

GitHub will create a `CNAME` file in your repository. If it doesn't, create one manually:

1. Create a file named `CNAME` (no extension)
2. Add your domain name: `sarojdebnath.com`
3. Commit and push

### Verifying Your Domain

After DNS propagation:
1. Visit your custom domain
2. Ensure HTTPS is working (green padlock in browser)
3. Test `www` and non-`www` versions

## 🎨 Customization

### Changing Colors

Edit `style.css` or modify Tailwind classes in `index.html`. Key colors:
- Primary blue: `#2563EB` (text-blue-600, bg-blue-600)
- Dark blue: `#1D4ED8` (hover states)
- Backgrounds: `#F9FAFB` (gray-50)

### Changing Fonts

Add custom fonts to `index.html` `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Then update Tailwind config in `index.html`:

```html
<script>
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        }
      }
    }
  }
</script>
```

### Adding Sections

1. Add HTML section in `index.html`
2. Add corresponding data structure in `data.json`
3. Add JavaScript function in `script.js` to populate content
4. Add navigation link in navbar

## 🐛 Troubleshooting

### Website Not Loading

- Check that GitHub Pages is enabled in repository settings
- Ensure repository is public
- Wait 5-10 minutes after first deployment
- Check browser console for JavaScript errors

### Images Not Displaying

- Ensure image files are in the repository
- Check image paths in `data.json` are correct
- Image filenames are case-sensitive

### Custom Domain Not Working

- Verify DNS records are correct
- Wait 24-48 hours for DNS propagation
- Clear browser cache
- Try accessing in incognito/private mode
- Check HTTPS certificate is valid

### Content Not Updating

- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check `data.json` syntax is valid (use [JSONLint](https://jsonlint.com))
- Check browser console for errors
- Ensure changes were committed and pushed to GitHub

## 📱 Testing Responsiveness

Test your website on different devices:
- Desktop: 1920px+
- Laptop: 1366px
- Tablet: 768px
- Mobile: 375px

Use browser DevTools (F12) > Toggle Device Toolbar (Ctrl+Shift+M)

## 🔒 Security & Best Practices

- ✅ Never commit sensitive information (API keys, passwords)
- ✅ Validate JSON before pushing
- ✅ Keep dependencies updated
- ✅ Enable HTTPS (automatic with GitHub Pages)
- ✅ Regular backups of your repository

## 📊 Analytics (Optional)

To track website visits, add Google Analytics:

1. Get tracking ID from [Google Analytics](https://analytics.google.com)
2. Add before `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🆘 Support

If you encounter issues:
1. Check this README thoroughly
2. Validate `data.json` syntax
3. Check browser console for errors
4. Review GitHub Pages documentation
5. Search GitHub Issues for similar problems

## 📝 License

This portfolio template is free to use and modify for personal use.

## 🎉 Quick Start Checklist

- [ ] Edit `data.json` with your information
- [ ] Replace placeholder content with your real data
- [ ] Add your profile images and screenshots
- [ ] Update contact information
- [ ] Test locally (open `index.html` in browser)
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Enable GitHub Pages
- [ ] (Optional) Set up custom domain
- [ ] Share your portfolio!

---

**Built with ❤️ using HTML, Tailwind CSS, and JavaScript**

Last updated: November 2025

