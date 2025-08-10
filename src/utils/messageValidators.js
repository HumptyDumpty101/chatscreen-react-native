import { CHAT_CONFIG } from '../constants/config';

export const validateMessage = (text) => {
  const trimmed = text?.trim();
  
  if (!trimmed) {
    return { isValid: false, error: 'Message cannot be empty' };
  }
  
  if (trimmed.length < CHAT_CONFIG.MIN_MESSAGE_LENGTH) {
    return { isValid: false, error: 'Message is too short' };
  }
  
  if (trimmed.length > CHAT_CONFIG.MAX_MESSAGE_LENGTH) {
    return { isValid: false, error: `Message cannot exceed ${CHAT_CONFIG.MAX_MESSAGE_LENGTH} characters` };
  }
  
  return { isValid: true, error: null };
};

export const sanitizeMessage = (text) => {
  // Preserve line breaks, only replace multiple spaces/tabs with single spaces
  return text?.trim().replace(/[ \t]+/g, ' ') || '';
};

export const generateMessageId = () => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};