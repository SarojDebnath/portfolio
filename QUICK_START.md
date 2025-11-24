# Quick Start - Chatbot Setup

## 🎯 What Goes Where

### **GitHub Pages** (Frontend - FREE)
- ✅ `index.html` - Updated with chatbot script
- ✅ `chatbot.js` - Chatbot UI component
- ✅ `style.css` - Chatbot styles (already added)
- ✅ `data.json` - Your portfolio data (used by RAG)

**Deploy**: Just push to GitHub, GitHub Pages auto-deploys

### **Vercel** (Backend API - FREE)
- ✅ `api/chat.js` - RAG + Groq API integration
- ✅ `package.json` - Node.js config
- ✅ `vercel.json` - Vercel deployment config

**Deploy**: `vercel` command (see CHATBOT_SETUP.md)

### **Groq API** (LLM Service - FREE)
- ✅ No hosting needed
- ✅ Just need API key from console.groq.com

## ⚡ 3-Step Setup

### 1. Get Groq API Key (2 minutes)
- Visit: https://console.groq.com/
- Sign up → Create API key → Copy it

### 2. Deploy Backend (5 minutes)

**Windows (Command Prompt or PowerShell):**
```cmd
npm install -g vercel
vercel login
vercel
```

**Then set API key in Vercel Dashboard:**
- Settings → Environment Variables
- Add `GROQ_API_KEY` = `your-groq-api-key-here`
- Redeploy: `vercel --prod`

### 3. Update Frontend (1 minute)
- Edit `index.html` line ~532
- Replace API URL with your Vercel URL
- Push to GitHub

## 📍 File Locations Summary

```
GitHub Pages (yourusername.github.io):
├── index.html          ← Has chatbot script
├── chatbot.js         ← Chatbot UI
├── style.css          ← Chatbot styles
└── data.json          ← Portfolio data

Vercel (your-app.vercel.app):
├── api/chat.js        ← Backend API
├── package.json       ← Config
└── vercel.json        ← Deployment config
```

## 🔗 Important URLs

After deployment, you'll have:
- **Frontend**: `https://yourusername.github.io` (GitHub Pages)
- **Backend**: `https://your-app.vercel.app/api/chat` (Vercel)

Update the backend URL in `index.html`!

## ✅ Checklist

- [ ] Get Groq API key
- [ ] Deploy to Vercel
- [ ] Set `GROQ_API_KEY` environment variable in Vercel
- [ ] Set `PORTFOLIO_DATA_URL` in Vercel (optional, defaults to GitHub Pages)
- [ ] Update API URL in `index.html`
- [ ] Push to GitHub
- [ ] Test chatbot!

## 🆘 Quick Troubleshooting

**Chatbot not showing?**
→ Check browser console (F12)

**"API key not configured"?**
→ Set `GROQ_API_KEY` in Vercel dashboard

**Not responding?**
→ Check Vercel function logs

---

For detailed instructions, see [CHATBOT_SETUP.md](CHATBOT_SETUP.md)

