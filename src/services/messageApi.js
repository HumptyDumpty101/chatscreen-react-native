import { API_CONFIG, CHAT_CONFIG } from '../constants/config';

class MessageApiService {
  constructor() {
    this.requestCache = new Map();
    this.lastRequestTime = 0;
  }

  async fetchRandomComment() {
    const now = Date.now();
    if (now - this.lastRequestTime < CHAT_CONFIG.RATE_LIMIT_DELAY) {
      await new Promise(resolve => setTimeout(resolve, CHAT_CONFIG.RATE_LIMIT_DELAY - (now - this.lastRequestTime)));
    }

    try {
      const response = await this.makeRequest(`${API_CONFIG.DUMMY_JSON.COMMENTS}?limit=1&skip=${Math.floor(Math.random() * 100)}`);
      this.lastRequestTime = Date.now();
      
      if (response.comments && response.comments.length > 0) {
        return response.comments[0].body;
      }
      throw new Error('No comments found');
    } catch (error) {
      console.warn('Primary API failed, trying fallback:', error.message);
      return this.fetchFallbackComment();
    }
  }

  async fetchFallbackComment() {
    try {
      const randomId = Math.floor(Math.random() * 500) + 1;
      const response = await this.makeRequest(`${API_CONFIG.FALLBACK.COMMENTS}/${randomId}`);
      return response.body || 'Hello! How are you doing?';
    } catch (error) {
      console.warn('Fallback API failed, using default messages:', error.message);
      return this.getDefaultMessage();
    }
  }

  async makeRequest(url) {
    const cacheKey = url;
    
    if (this.requestCache.has(cacheKey)) {
      const cached = this.requestCache.get(cacheKey);
      if (Date.now() - cached.timestamp < 60000) {
        return cached.data;
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CHAT_CONFIG.API_TIMEOUT);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      this.requestCache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      if (this.requestCache.size > 50) {
        const firstKey = this.requestCache.keys().next().value;
        this.requestCache.delete(firstKey);
      }

      return data;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  getDefaultMessage() {
    const defaultMessages = [
      'That sounds interesting!',
      'I agree with you.',
      'Thanks for sharing that.',
      'How was your day?',
      'What do you think about this?',
      'That is a great point!',
      'I see what you mean.',
      'Tell me more about it.',
      'That sounds good to me.',
      'Hope you are having a great day!'
    ];
    
    return defaultMessages[Math.floor(Math.random() * defaultMessages.length)];
  }

  clearCache() {
    this.requestCache.clear();
  }
}

export default new MessageApiService();