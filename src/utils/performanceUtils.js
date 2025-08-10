import { InteractionManager } from 'react-native';

export const runAfterInteractions = (callback) => {
  return new Promise(resolve => {
    InteractionManager.runAfterInteractions(() => {
      const result = callback();
      resolve(result);
    });
  });
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const memoizeWithExpiry = (fn, ttl = 60000) => {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value;
    }
    
    const result = fn.apply(this, args);
    cache.set(key, { value: result, timestamp: Date.now() });
    
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    return result;
  };
};

export class MemoryManager {
  constructor(maxMessages = 1000) {
    this.maxMessages = maxMessages;
    this.messageCache = new Map();
  }

  addMessage(message) {
    this.messageCache.set(message.id, message);
    
    if (this.messageCache.size > this.maxMessages) {
      const oldestKey = this.messageCache.keys().next().value;
      this.messageCache.delete(oldestKey);
    }
  }

  getMessage(id) {
    return this.messageCache.get(id);
  }

  clearCache() {
    this.messageCache.clear();
  }

  getMemoryUsage() {
    return {
      messageCount: this.messageCache.size,
      estimatedMemoryMB: (this.messageCache.size * 0.5) / 1024
    };
  }
}

export const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  if (__DEV__) {
    console.log(`Performance [${name}]: ${(end - start).toFixed(2)}ms`);
  }
  
  return result;
};

export const batchUpdates = (updates, delay = 16) => {
  return new Promise(resolve => {
    setTimeout(() => {
      updates.forEach(update => update());
      resolve();
    }, delay);
  });
};