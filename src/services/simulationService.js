import messageApi from './messageApi';
import { SIMULATION_CONFIG, USERS } from '../constants/config';
import { generateMessageId } from '../utils/messageValidators';

class SimulationService {
  constructor() {
    this.isActive = false;
    this.mode = 'auto';
    this.timeoutId = null;
    this.stats = {
      messagesSent: 0,
      uptime: 0,
      startTime: null,
      nextMessage: null
    };
    this.listeners = [];
  }

  start(mode = 'auto', onMessageGenerated) {
    if (this.isActive) {
      this.stop();
    }

    this.isActive = true;
    this.mode = mode;
    this.stats.startTime = Date.now();
    this.stats.messagesSent = 0;
    
    this.onMessageGenerated = onMessageGenerated;
    this.scheduleNextMessage();
    this.startUptimeCounter();
    
    this.notifyListeners('started', { mode });
  }

  stop() {
    this.isActive = false;
    
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    
    if (this.uptimeInterval) {
      clearInterval(this.uptimeInterval);
      this.uptimeInterval = null;
    }
    
    this.stats.nextMessage = null;
    this.notifyListeners('stopped');
  }

  async sendSingleMessage() {
    if (!this.onMessageGenerated) return;
    
    try {
      const typingMessage = {
        id: `typing_single_${Date.now()}`,
        type: 'typing',
        senderId: USERS.OTHER_USER.id,
        timestamp: Date.now()
      };
      this.onMessageGenerated(typingMessage);
      
      setTimeout(async () => {
        try {
          const message = await this.generateMessage();
          this.onMessageGenerated(message);
          this.stats.messagesSent++;
          this.notifyListeners('messageSent', { message });
        } catch (error) {
          console.error('Error generating single message:', error);
        }
      }, 1500);
    } catch (error) {
      console.error('Error sending single message:', error);
    }
  }

  async sendBurstMessages() {
    if (!this.onMessageGenerated) return;
    
    const { MESSAGE_COUNT, DELAY_BETWEEN } = SIMULATION_CONFIG.BURST_MODE;
    
    const typingMessage = {
      id: `typing_burst_${Date.now()}`,
      type: 'typing',
      senderId: USERS.OTHER_USER.id,
      timestamp: Date.now()
    };
    this.onMessageGenerated(typingMessage);
    
    setTimeout(async () => {
      for (let i = 0; i < MESSAGE_COUNT; i++) {
        try {
          if (i > 0) {
            await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN));
          }
          
          const message = await this.generateMessage('burst');
          this.onMessageGenerated(message);
          this.stats.messagesSent++;
          this.notifyListeners('messageSent', { message, burst: true });
        } catch (error) {
          console.error('Error in burst message:', error);
        }
      }
    }, 1500);
  }

  async showTypingIndicator() {
    if (!this.onMessageGenerated) return;
    
    const typingMessage = {
      id: `typing_${Date.now()}`,
      type: 'typing',
      senderId: USERS.OTHER_USER.id,
      timestamp: Date.now()
    };
    
    this.onMessageGenerated(typingMessage);
    
    setTimeout(() => {
      if (this.onMessageGenerated) {
        this.onMessageGenerated({ id: typingMessage.id, remove: true });
      }
    }, 2000);
  }

  scheduleNextMessage() {
    if (!this.isActive || this.mode === 'manual') return;
    
    const { MIN_DELAY, MAX_DELAY } = SIMULATION_CONFIG.AUTO_MODE;
    const delay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
    
    this.stats.nextMessage = Date.now() + delay;
    
    this.timeoutId = setTimeout(async () => {
      if (this.isActive && this.onMessageGenerated) {
        try {
          // Show typing indicator
          const typingMessage = {
            id: `typing_${Date.now()}`,
            type: 'typing',
            senderId: USERS.OTHER_USER.id,
            timestamp: Date.now()
          };
          
          this.onMessageGenerated(typingMessage);
          
          setTimeout(async () => {
            if (this.isActive && this.onMessageGenerated) {
              try {
                const message = await this.generateMessage();
                this.onMessageGenerated(message);
                this.stats.messagesSent++;
                this.notifyListeners('messageSent', { message });
                this.scheduleNextMessage();
              } catch (error) {
                console.error('Error generating scheduled message:', error);
                this.scheduleNextMessage();
              }
            }
          }, 2000);
        } catch (error) {
          console.error('Error in message generation:', error);
          this.scheduleNextMessage();
        }
      }
    }, delay);
  }

  async generateMessage(context = 'auto', lastUserMessage = null) {
    let messageText;
    
    if (context === 'contextual' && lastUserMessage) {
      messageText = this.generateContextualResponse(lastUserMessage);
    } else {
      try {
        messageText = await messageApi.fetchRandomComment();
      } catch (error) {
        messageText = this.getRandomDefaultMessage();
      }
    }

    return {
      id: generateMessageId(),
      text: messageText,
      senderId: USERS.OTHER_USER.id,
      timestamp: Date.now(),
      status: null
    };
  }

  generateContextualResponse(lastMessage) {
    const text = lastMessage.text.toLowerCase();
    const { CONTEXTUAL_RESPONSES } = SIMULATION_CONFIG;
    
    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
      return this.getRandomFromArray(CONTEXTUAL_RESPONSES.greeting);
    }
    
    if (text.includes('work') || text.includes('project') || text.includes('task')) {
      return this.getRandomFromArray(CONTEXTUAL_RESPONSES.work);
    }
    
    if (text.includes('?')) {
      return this.getRandomFromArray(CONTEXTUAL_RESPONSES.question);
    }
    
    if (text.includes('weather') || text.includes('day') || text.includes('today')) {
      return this.getRandomFromArray(CONTEXTUAL_RESPONSES.casual);
    }
    
    return this.getRandomFromArray(CONTEXTUAL_RESPONSES.default);
  }

  getRandomDefaultMessage() {
    const defaultMessages = [
      'That sounds interesting!',
      'I see what you mean.',
      'Thanks for sharing!',
      'How was your day?',
      'That is a great point!',
      'Tell me more about it.',
      'I completely agree.',
      'What do you think?',
      'Hope you are doing well!',
      'That sounds good to me.'
    ];
    
    return this.getRandomFromArray(defaultMessages);
  }

  getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  startUptimeCounter() {
    this.uptimeInterval = setInterval(() => {
      if (this.isActive && this.stats.startTime) {
        this.stats.uptime = Date.now() - this.stats.startTime;
        this.notifyListeners('statsUpdate', this.stats);
      }
    }, 1000);
  }

  addListener(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  notifyListeners(event, data) {
    this.listeners.forEach(listener => {
      try {
        listener(event, data);
      } catch (error) {
        console.error('Error in simulation listener:', error);
      }
    });
  }

  getStats() {
    return {
      ...this.stats,
      isActive: this.isActive,
      mode: this.mode
    };
  }
}

export default new SimulationService();