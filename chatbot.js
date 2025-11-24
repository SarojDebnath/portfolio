// Chatbot Component for Portfolio
// Handles UI and API communication

class PortfolioChatbot {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.isOpen = false;
    this.conversationHistory = [];
    this.isLoading = false;
    
    this.init();
  }
  
  init() {
    this.createChatbotUI();
    this.attachEventListeners();
  }
  
  createChatbotUI() {
    // Create chatbot container
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    chatbotContainer.innerHTML = `
      <!-- Chatbot Button -->
      <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Open chatbot">
        <img src="data/chatbot.png?v=2" alt="Saroj" class="chatbot-avatar-img" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\'fas fa-comments\'></i>';" />
        <span class="chatbot-badge" id="chatbot-badge" style="display: none;">1</span>
      </button>
      
      <!-- Chat Window -->
      <div id="chatbot-window" class="chatbot-window hidden">
        <div class="chatbot-header">
          <div class="chatbot-header-content">
            <i class="fas fa-robot"></i>
            <div>
              <h3>Portfolio Assistant</h3>
              <p class="chatbot-subtitle">Ask me about projects, skills, or experience</p>
            </div>
          </div>
          <button id="chatbot-close" class="chatbot-close" aria-label="Close chatbot">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div id="chatbot-messages" class="chatbot-messages">
          <div class="chatbot-message chatbot-message-bot">
            <div class="chatbot-avatar">
              <img src="data/chatbot.png?v=2" alt="Saroj" class="chatbot-avatar-img-small" onerror="this.parentElement.innerHTML='<i class=\'fas fa-robot\'></i>';" />
            </div>
            <div class="chatbot-message-content">
              <p>Hey! 👋 I'm Saroj's AI assistant. I can help you learn about his projects, skills, and experience in Robotics, Computer Vision, and LLMOps. How can I help you?</p>
            </div>
          </div>
        </div>
        
        <div class="chatbot-input-container">
          <div class="chatbot-input-wrapper">
            <input 
              type="text" 
              id="chatbot-input" 
              class="chatbot-input" 
              placeholder="Ask about projects, skills, or experience..."
              autocomplete="off"
            />
            <button id="chatbot-send" class="chatbot-send" aria-label="Send message">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
          <p class="chatbot-footer">Powered by Llama 3.1 via Groq API</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(chatbotContainer);
  }
  
  attachEventListeners() {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const window = document.getElementById('chatbot-window');
    
    // Toggle chatbot
    toggleBtn.addEventListener('click', () => this.toggleChatbot());
    closeBtn.addEventListener('click', () => this.closeChatbot());
    
    // Send message
    sendBtn.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    
    // Close on outside click
    window.addEventListener('click', (e) => {
      if (e.target === window) {
        this.closeChatbot();
      }
    });
  }
  
  toggleChatbot() {
    this.isOpen = !this.isOpen;
    const window = document.getElementById('chatbot-window');
    const toggleBtn = document.getElementById('chatbot-toggle');
    const badge = document.getElementById('chatbot-badge');
    
    if (this.isOpen) {
      window.classList.remove('hidden');
      toggleBtn.classList.add('active');
      toggleBtn.classList.remove('chatbot-pulse'); // Remove pulse animation
      if (badge) badge.style.display = 'none'; // Hide badge when opened
      document.getElementById('chatbot-input').focus();
    } else {
      this.closeChatbot();
    }
  }
  
  closeChatbot() {
    this.isOpen = false;
    const window = document.getElementById('chatbot-window');
    const toggleBtn = document.getElementById('chatbot-toggle');
    
    window.classList.add('hidden');
    toggleBtn.classList.remove('active');
  }
  
  async sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message || this.isLoading) return;
    
    // Clear input
    input.value = '';
    
    // Add user message to UI
    this.addMessage(message, 'user');
    
    // Show loading
    this.setLoading(true);
    
    try {
      // Call API
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          conversationHistory: this.conversationHistory
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }
      
      // Add bot response
      this.addMessage(data.message, 'bot');
      
      // Update conversation history
      this.conversationHistory.push(
        { role: 'user', content: message },
        { role: 'assistant', content: data.message }
      );
      
      // Keep history manageable (last 10 messages)
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = this.conversationHistory.slice(-10);
      }
      
    } catch (error) {
      console.error('Chatbot error:', error);
      let errorMessage = 'Sorry, I encountered an error. ';
      
      if (error.message.includes('Rate limit')) {
        errorMessage += 'Please wait a moment and try again.';
      } else if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
        errorMessage += `Unable to connect to the API server. Error: ${error.message}. Please check the API URL in index.html.`;
        console.error('API URL:', this.apiUrl);
        console.error('Full error:', error);
      } else {
        errorMessage += error.message;
      }
      
      this.addMessage(errorMessage, 'bot', true);
    } finally {
      this.setLoading(false);
    }
  }
  
  addMessage(text, role, isError = false) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message chatbot-message-${role} ${isError ? 'chatbot-message-error' : ''}`;
    
    // Add email suggestion if bot seems confused or mentions not knowing
    let formattedText = this.formatMessage(text);
    if (role === 'bot' && !isError && (
      text.toLowerCase().includes("don't know") || 
      text.toLowerCase().includes("not sure") || 
      text.toLowerCase().includes("can't help") ||
      text.toLowerCase().includes("cannot help") ||
      text.toLowerCase().includes("unable to") ||
      text.toLowerCase().includes("don't have that information")
    )) {
      formattedText += '<br><br><small style="opacity: 0.8;">📧 For more details, you can contact Saroj at <a href="mailto:sarojdebnath2405@gmail.com" style="color: #2563EB; text-decoration: underline;">sarojdebnath2405@gmail.com</a></small>';
    }
    
    if (role === 'bot') {
      messageDiv.innerHTML = `
        <div class="chatbot-avatar">
          <img src="data/chatbot.png?v=2" alt="Saroj" class="chatbot-avatar-img-small" onerror="this.parentElement.innerHTML='<i class=\'fas fa-robot\'></i>';" />
        </div>
        <div class="chatbot-message-content">
          <p>${formattedText}</p>
        </div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="chatbot-message-content">
          <p>${formattedText}</p>
        </div>
        <div class="chatbot-avatar chatbot-avatar-user">
          <i class="fas fa-user"></i>
        </div>
      `;
    }
    
    messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
  }
  
  formatMessage(text) {
    // Simple formatting: preserve line breaks and escape HTML
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
  }
  
  setLoading(loading) {
    this.isLoading = loading;
    const messagesContainer = document.getElementById('chatbot-messages');
    const loadingIndicator = document.getElementById('chatbot-loading');
    
    if (loading) {
      if (!loadingIndicator) {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'chatbot-loading';
        loadingDiv.className = 'chatbot-message chatbot-message-bot';
        loadingDiv.innerHTML = `
          <div class="chatbot-avatar">
            <i class="fas fa-robot"></i>
          </div>
          <div class="chatbot-message-content">
            <div class="chatbot-typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        `;
        messagesContainer.appendChild(loadingDiv);
        this.scrollToBottom();
      }
    } else {
      if (loadingIndicator) {
        loadingIndicator.remove();
      }
    }
  }
  
  scrollToBottom() {
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Get API URL from environment or use default
  // In production, this should be your Vercel deployment URL
  let apiUrl = window.CHATBOT_API_URL || 'https://your-vercel-app.vercel.app/api/chat';
  
  // Use CORS proxy if needed (temporary workaround for CORS issues)
  // Remove this once CORS is fixed on the backend
  const useCORSProxy = window.USE_CORS_PROXY || false;
  if (useCORSProxy) {
    apiUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;
  }
  
  // Initialize chatbot
  window.portfolioChatbot = new PortfolioChatbot(apiUrl);
  
  // Auto-popup after 3 seconds to greet the visitor
  setTimeout(() => {
    if (!window.portfolioChatbot.isOpen) {
      // Open the chatbot automatically
      window.portfolioChatbot.toggleChatbot();
    }
  }, 3000); // Auto-open after 3 seconds
});

