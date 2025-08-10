import { useState, useCallback, useRef } from 'react';
import { validateMessage, sanitizeMessage, generateMessageId } from '../utils/messageValidators';
import { USERS } from '../constants/config';

export const useMessageInput = (onSendMessage) => {
  const [inputText, setInputText] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);
  
  const inputRef = useRef(null);

  const handleTextChange = useCallback((text) => {
    setInputText(text);
    
    const validation = validateMessage(text);
    setIsValid(validation.isValid);
    setError(validation.error);
  }, []);

  const sendMessage = useCallback(async () => {
    const trimmed = sanitizeMessage(inputText);
    const validation = validateMessage(trimmed);
    
    if (!validation.isValid) {
      setError(validation.error);
      return false;
    }

    setIsSending(true);
    
    try {
      const message = {
        id: generateMessageId(),
        text: trimmed,
        senderId: USERS.CURRENT_USER.id,
        timestamp: Date.now(),
        status: 'sent'
      };

      await onSendMessage(message);
      
      setInputText('');
      setIsValid(false);
      setError(null);
      
      inputRef.current?.blur();
      
      setTimeout(() => {
        if (message.status === 'sent') {
          message.status = 'delivered';
        }
      }, 1000);

      return true;
    } catch (error) {
      setError('Failed to send message. Please try again.');
      return false;
    } finally {
      setIsSending(false);
    }
  }, [inputText, onSendMessage]);

  const clearInput = useCallback(() => {
    setInputText('');
    setIsValid(false);
    setError(null);
    inputRef.current?.focus();
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return {
    inputText,
    isValid,
    error,
    isSending,
    inputRef,
    handleTextChange,
    sendMessage,
    clearInput,
    focusInput
  };
};