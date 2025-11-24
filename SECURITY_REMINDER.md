# 🔒 Security Reminder

## ⚠️ IMPORTANT: Never Commit API Keys

Your Groq API key should **NEVER** be committed to Git or pushed to GitHub.

### ✅ Correct Way (What We Did)
- API key stored in **Vercel Environment Variables**
- Code uses `process.env.GROQ_API_KEY` (reads from environment)
- `.gitignore` already excludes `.env` files

### ❌ Wrong Way (Don't Do This)
- Don't hardcode the key in `api/chat.js`
- Don't put it in `index.html` or `chatbot.js`
- Don't commit `.env` files

## 🔑 Setting Up Your API Key

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project** (after deploying)
3. **Settings** → **Environment Variables**
4. **Add Variable**:
   - Name: `GROQ_API_KEY`
   - Value: `your-groq-api-key-here` (get from console.groq.com)
   - Environment: Select all (Production, Preview, Development)
5. **Save** and **Redeploy**

## ✅ Verification

After setting the environment variable:
- The API key is stored securely in Vercel
- It's never exposed to the frontend
- It's never in your Git repository
- Only your Vercel functions can access it

## 🛡️ If You Accidentally Committed a Key

If you accidentally committed an API key:
1. **Rotate the key immediately** in Groq Console
2. **Remove it from Git history** (use `git filter-branch` or BFG Repo-Cleaner)
3. **Set the new key in Vercel**

---

**Your current setup is secure!** ✅ The code correctly uses environment variables.

