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
        <i class="fas fa-comments"></i>
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
              <i class="fas fa-robot"></i>
            </div>
            <div class="chatbot-message-content">
              <p>Hello! I'm your portfolio assistant. I can help you learn about Saroj's projects, skills, and experience in Robotics, Computer Vision, and LLMOps. What would you like to know?</p>
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
    
    if (this.isOpen) {
      window.classList.remove('hidden');
      toggleBtn.classList.add('active');
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
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage += 'Unable to connect to the server. Please check your connection.';
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
    
    if (role === 'bot') {
      messageDiv.innerHTML = `
        <div class="chatbot-avatar">
          <i class="fas fa-robot"></i>
        </div>
        <div class="chatbot-message-content">
          <p>${this.formatMessage(text)}</p>
        </div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="chatbot-message-content">
          <p>${this.formatMessage(text)}</p>
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
  const apiUrl = window.CHATBOT_API_URL || 'https://your-vercel-app.vercel.app/api/chat';
  
  // Initialize chatbot
  window.portfolioChatbot = new PortfolioChatbot(apiUrl);
});

