// Express server for Railway deployment
// Handles RAG chatbot API with CORS support

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration - allow all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Import the chat handler logic
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const PORTFOLIO_DATA_URL = process.env.PORTFOLIO_DATA_URL || 'https://raw.githubusercontent.com/SarojDebnath/portfolio/main/data.json';

// Cache portfolio data
let portfolioDataCache = null;
let portfolioDataCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Load portfolio data
async function loadPortfolioData() {
  const now = Date.now();
  if (portfolioDataCache && (now - portfolioDataCacheTime) < CACHE_DURATION) {
    return portfolioDataCache;
  }
  
  try {
    const response = await fetch(PORTFOLIO_DATA_URL);
    if (!response.ok) throw new Error('Failed to load portfolio data');
    portfolioDataCache = await response.json();
    portfolioDataCacheTime = now;
    return portfolioDataCache;
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    return getFallbackData();
  }
}

// Fallback data if fetch fails
function getFallbackData() {
  return {
    hero: { intro: "Robotic Vision Engineer & LLMOps Specialist" },
    profile: { intro: "Building intelligent robotic systems with advanced computer vision and deploying production-ready LLM solutions." },
    projects: { robotics: [], llmops: [] },
    experience: [],
    skills: []
  };
}

// Simple embedding function (keyword-based similarity)
function createEmbedding(text) {
  if (!text) return [];
  return text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);
}

function calculateSimilarity(queryWords, docWords) {
  if (queryWords.length === 0 || docWords.length === 0) return 0;
  const querySet = new Set(queryWords);
  const docSet = new Set(docWords);
  let matches = 0;
  querySet.forEach(word => {
    if (docSet.has(word)) matches++;
  });
  return matches / Math.max(querySet.size, 1);
}

// RAG: Retrieve relevant context from portfolio
function retrieveContext(query, portfolioData, topK = 3) {
  const queryWords = createEmbedding(query);
  const sections = [];
  
  // Build searchable sections
  if (portfolioData.hero?.intro) {
    sections.push({ text: portfolioData.hero.intro, source: "Introduction" });
  }
  if (portfolioData.profile?.intro) {
    sections.push({ text: portfolioData.profile.intro, source: "Profile" });
  }
  
  // Add projects
  if (portfolioData.projects?.robotics) {
    portfolioData.projects.robotics.forEach(proj => {
      sections.push({
        text: `${proj.title}. ${proj.description}`,
        source: `Robotics Project: ${proj.title}`
      });
    });
  }
  
  if (portfolioData.projects?.llmops) {
    portfolioData.projects.llmops.forEach(proj => {
      sections.push({
        text: `${proj.title}. ${proj.description}`,
        source: `LLMOps Project: ${proj.title}`
      });
    });
  }
  
  // Add experience
  if (portfolioData.experience) {
    portfolioData.experience.forEach(exp => {
      sections.push({
        text: `${exp.title} at ${exp.company} (${exp.duration}). ${exp.description}`,
        source: `Experience: ${exp.company}`
      });
    });
  }
  
  // Calculate similarity scores
  const scored = sections.map(section => ({
    ...section,
    score: calculateSimilarity(queryWords, createEmbedding(section.text))
  }));
  
  // Sort by score and return top K
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).filter(item => item.score > 0);
}

// Build RAG prompt with context
function buildRAGPrompt(userQuery, contexts, portfolioData) {
  const name = "Saroj Debnath";
  const title = "Robotic Vision Engineer & LLMOps Specialist";
  
  let contextText = '';
  if (contexts.length > 0) {
    contextText = '\n\nRelevant information from the portfolio:\n' + 
      contexts.map((ctx, i) => `${i + 1}. ${ctx.source}: ${ctx.text}`).join('\n');
  }
  
  return `You are a helpful AI assistant for ${name}'s portfolio website. 
${name} is a ${title}.

Your role is to help visitors learn about ${name}'s work, projects, and expertise in:
- Robotics and Computer Vision
- LLMOps and AI/ML
- Industrial automation and robotic systems
${contextText}

Guidelines:
- Answer questions based on the provided context
- Be concise and friendly
- If asked about something not in the portfolio, politely say you can only answer questions about ${name}'s portfolio
- Highlight specific achievements and technologies when relevant

User Question: ${userQuery}

Provide a helpful, concise answer:`;
}

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio Chatbot API' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    if (!GROQ_API_KEY) {
      return res.status(500).json({ 
        error: 'Groq API key not configured. Please set GROQ_API_KEY environment variable.' 
      });
    }
    
    // Load portfolio data
    const portfolioData = await loadPortfolioData();
    
    // Step 1: RAG - Retrieve relevant context
    const contexts = retrieveContext(message, portfolioData, 3);
    
    // Step 2: Build prompt with context
    const systemPrompt = buildRAGPrompt(message, contexts, portfolioData);
    
    // Step 3: Prepare messages for Groq API
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-4).map(msg => ({
        role: msg.role || 'user',
        content: msg.content || msg.message
      })),
      { role: 'user', content: message }
    ];
    
    // Step 4: Call Groq API
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      })
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Groq API error:', response.status, errorData);
      
      if (response.status === 429) {
        return res.status(429).json({ 
          error: 'Rate limit exceeded. Please try again in a moment.',
          retryAfter: 60
        });
      }
      
      return res.status(response.status).json({ 
        error: 'Failed to get response from AI service',
        details: errorData.substring(0, 200)
      });
    }
    
    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    
    return res.status(200).json({
      message: aiMessage,
      contexts: contexts.map(ctx => ctx.source)
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

