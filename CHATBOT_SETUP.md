# Chatbot Setup Guide

This guide explains how to set up and deploy the RAG chatbot for your portfolio.

## 📁 File Structure

```
portfolio/
├── api/
│   └── chat.js              # Backend API (deploy to Vercel)
├── chatbot.js               # Frontend chatbot component (GitHub Pages)
├── index.html               # Updated with chatbot script
├── style.css                # Updated with chatbot styles
├── package.json             # Node.js config for Vercel
├── vercel.json              # Vercel deployment config
└── CHATBOT_SETUP.md         # This file
```

## 🏗️ Architecture

```
┌─────────────────┐
│  GitHub Pages   │  ← Frontend (chatbot.js)
│  (Static Site)  │     - Chatbot UI
└────────┬────────┘     - Calls API
         │
         │ HTTP Request
         ↓
┌─────────────────┐
│  Vercel Serverless│  ← Backend (api/chat.js)
│  Function        │     - RAG Pipeline
└────────┬────────┘     - Groq API Integration
         │
         │ API Call
         ↓
┌─────────────────┐
│  Groq API       │  ← LLM Service (FREE)
│  (Llama 3.1)    │     - No hosting needed
└─────────────────┘
```

## 🚀 Deployment Steps

### Step 1: Get Groq API Key (FREE)

1. Go to [Groq Console](https://console.groq.com/)
2. Sign up for a free account (no credit card required)
3. Navigate to "API Keys" section
4. Create a new API key
5. Copy the API key (you'll need it for Step 3)

### Step 2: Deploy Backend to Vercel (FREE)

**For Windows Users:** See [WINDOWS_SETUP.md](WINDOWS_SETUP.md) for detailed Windows instructions.

1. **Install Vercel CLI** (if not already installed):
   ```cmd
   npm install -g vercel
   ```
   **Note**: Use Command Prompt (cmd) or PowerShell on Windows. No bash needed!

2. **Login to Vercel**:
   ```cmd
   vercel login
   ```

3. **Deploy from your portfolio directory**:
   ```cmd
   cd C:\Users\sarojd\portfolio
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? **No** (first time)
   - Project name: **portfolio-chatbot** (or your choice)
   - Directory: **./** (current directory)
   - Override settings? **No**

4. **Set Environment Variable**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Go to **Settings** → **Environment Variables**
   - Add:
     - **Name**: `GROQ_API_KEY`
     - **Value**: Your Groq API key (from Step 1)
     - **Environment**: Production, Preview, Development (select all)
   - Click **Save**
   
   ⚠️ **Security Note**: This key is stored securely in Vercel and never exposed to the frontend.

5. **Set Portfolio Data URL** (Optional):
   - Add another environment variable:
     - **Name**: `PORTFOLIO_DATA_URL`
     - **Value**: `https://yourusername.github.io/data.json` (replace with your GitHub Pages URL)
   - This allows the backend to fetch your portfolio data dynamically

6. **Redeploy** (to apply environment variables):
   ```cmd
   vercel --prod
   ```

7. **Copy your Vercel URL**:
   - After deployment, Vercel will show you a URL like: `https://portfolio-chatbot-xyz.vercel.app`
   - Copy this URL - you'll need it for Step 3

### Step 3: Update Frontend with API URL

1. **Edit `index.html`**:
   - Find the line: `window.CHATBOT_API_URL = 'https://your-vercel-app.vercel.app/api/chat';`
   - Replace `https://your-vercel-app.vercel.app` with your actual Vercel URL from Step 2

2. **Commit and push to GitHub**:
   ```bash
   git add index.html
   git commit -m "Add chatbot with API URL"
   git push
   ```

### Step 4: Test the Chatbot

1. Wait 1-2 minutes for GitHub Pages to update
2. Visit your portfolio website
3. Click the chatbot button (bottom right)
4. Try asking: "What projects have you worked on?"
5. The chatbot should respond using your portfolio data!

## 🔧 Configuration

### Changing the Model

To use a different Groq model, edit `api/chat.js`:

```javascript
// Line ~150, change model name:
model: 'llama-3.1-70b-versatile', // Instead of 'llama-3.1-8b-instant'
```

Available models:
- `llama-3.1-8b-instant` (fastest, recommended)
- `llama-3.1-70b-versatile` (more capable, slower)

### Customizing Chatbot Appearance

Edit `style.css` - search for "CHATBOT STYLES" section to customize:
- Colors (currently blue gradient)
- Size and position
- Fonts and spacing

### Customizing Chatbot Behavior

Edit `chatbot.js`:
- Change welcome message
- Modify conversation history length
- Adjust API timeout settings

## 📊 How RAG Works

1. **User asks a question** → Frontend sends to backend
2. **Backend loads portfolio data** → Fetches from `data.json` (cached for 5 min)
3. **RAG Retrieval** → Searches portfolio for relevant context
4. **Context + Question** → Sent to Groq API with Llama 3.1
5. **Response** → AI generates answer based on portfolio context
6. **Display** → Frontend shows response to user

## 🐛 Troubleshooting

### Chatbot not appearing
- Check browser console (F12) for errors
- Verify `chatbot.js` is loaded in HTML
- Check that API URL is correct in `index.html`

### "API key not configured" error
- Verify `GROQ_API_KEY` is set in Vercel environment variables
- Redeploy after adding environment variable
- Check Vercel function logs

### "Rate limit exceeded" error
- Groq free tier has limits (14,400 requests/day)
- Wait a moment and try again
- Consider upgrading to paid tier if needed

### Chatbot not responding accurately
- Check that `PORTFOLIO_DATA_URL` points to your GitHub Pages `data.json`
- Verify portfolio data is accessible
- Check Vercel function logs for errors

### CORS errors
- Backend already includes CORS headers
- If issues persist, check Vercel deployment settings

## 💰 Cost Breakdown

- **GitHub Pages**: FREE ✅
- **Vercel Serverless**: FREE (generous free tier) ✅
- **Groq API**: FREE (14,400 requests/day) ✅
- **Total**: **$0/month** ✅

## 🔒 Security Notes

- API key is stored securely in Vercel (never exposed to frontend)
- CORS is configured to allow your GitHub Pages domain
- Rate limiting handled by Groq API

## 📝 Next Steps

1. ✅ Deploy backend to Vercel
2. ✅ Set environment variables
3. ✅ Update frontend API URL
4. ✅ Test chatbot
5. 🎉 Share your portfolio with AI assistant!

## 🆘 Need Help?

- Check Vercel function logs: Vercel Dashboard → Your Project → Functions → View Logs
- Check browser console: F12 → Console tab
- Verify all environment variables are set correctly
- Ensure portfolio data URL is accessible

---

**Built with:** Llama 3.1, Groq API, RAG, Vercel Serverless Functions

