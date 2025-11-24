# Windows Setup Guide - Chatbot Deployment

## 🪟 For Windows Users

All commands work in **Command Prompt (cmd)** or **PowerShell**. No bash needed!

## 📋 Prerequisites

1. **Node.js installed** - Download from [nodejs.org](https://nodejs.org/)
2. **Git installed** (optional, for GitHub) - Download from [git-scm.com](https://git-scm.com/)

## 🚀 Step-by-Step for Windows

### Step 1: Open Command Prompt or PowerShell

- Press `Win + R`
- Type `cmd` or `powershell`
- Press Enter
- Navigate to your portfolio folder:
  ```cmd
  cd C:\Users\sarojd\portfolio
  ```

### Step 2: Install Vercel CLI

```cmd
npm install -g vercel
```

**If you get permission errors**, run Command Prompt as Administrator:
- Right-click Command Prompt → "Run as administrator"

### Step 3: Login to Vercel

```cmd
vercel login
```

This will open your browser for authentication.

### Step 4: Deploy to Vercel

```cmd
vercel
```

**Follow the prompts:**
- Link to existing project? → Type `N` (No, first time)
- Project name → Type `portfolio-chatbot` (or press Enter for default)
- Directory → Press Enter (uses current directory)
- Override settings? → Type `N` (No)

### Step 5: Set API Key in Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Key**: `GROQ_API_KEY`
   - **Value**: `your-groq-api-key-here` (get from console.groq.com)
   - **Environments**: Check all (Production, Preview, Development)
6. Click **Save**

### Step 6: Redeploy

```cmd
vercel --prod
```

### Step 7: Update Frontend

1. Open `index.html` in your editor
2. Find line ~532 (search for `CHATBOT_API_URL`)
3. Replace `https://your-vercel-app.vercel.app` with your actual Vercel URL
   - Your Vercel URL will be shown after deployment (e.g., `https://portfolio-chatbot-xyz.vercel.app`)
4. Save the file

### Step 8: Push to GitHub

```cmd
git add index.html
git commit -m "Add chatbot with API URL"
git push
```

## ✅ Testing

1. Wait 1-2 minutes for GitHub Pages to update
2. Visit your portfolio: `https://yourusername.github.io`
3. Look for the chatbot button (bottom right corner)
4. Click it and try asking: "What projects have you worked on?"

## 🆘 Common Windows Issues

### "npm is not recognized"
- **Fix**: Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart Command Prompt after installation

### "Permission denied" when installing Vercel
- **Fix**: Run Command Prompt as Administrator
- Or use: `npm install -g vercel --force`

### "vercel is not recognized"
- **Fix**: Make sure Node.js is in your PATH
- Restart Command Prompt
- Try: `npm install -g vercel` again

### Path issues with spaces
- **Fix**: Use quotes around paths with spaces:
  ```cmd
  cd "C:\Users\sarojd\My Portfolio"
  ```

## 💡 Tips for Windows

- **Use PowerShell** for better experience (color output, better error messages)
- **Use VS Code** terminal (Ctrl + `) - it's integrated and easier
- **Copy/paste** works in Command Prompt: Right-click to paste

## 📝 Quick Command Reference

```cmd
# Navigate to folder
cd C:\Users\sarojd\portfolio

# Install Vercel
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Redeploy with production
vercel --prod

# Check Vercel version
vercel --version
```

---

**All set!** Your chatbot should be working now. 🎉

