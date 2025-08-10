import { useState, useRef, useCallback } from 'react';
import { CHAT_CONFIG } from '../constants/config';

export const useInfiniteScroll = (initialMessages = []) => {
  const [messages, setMessages] = useState(initialMessages);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [scrollPosition, setScrollPosition] = useState({ y: 0, isNearBottom: true });
  
  const flatListRef = useRef(null);
  const messageIds = useRef(new Set(initialMessages.map(m => m.id)));
  const totalMessagesGenerated = useRef(initialMessages.length);

  const addMessage = useCallback((newMessage) => {
    if (messageIds.current.has(newMessage.id)) {
      return;
    }

    messageIds.current.add(newMessage.id);
    setMessages(prev => [newMessage, ...prev]);
  }, []);

  const addMessages = useCallback((newMessages) => {
    const uniqueMessages = newMessages.filter(msg => !messageIds.current.has(msg.id));
    
    if (uniqueMessages.length === 0) {
      return;
    }

    uniqueMessages.forEach(msg => messageIds.current.add(msg.id));
    setMessages(prev => [...uniqueMessages, ...prev]);
  }, []);

  const loadOlderMessages = useCallback(async () => {
    if (isLoadingMore || !hasMoreMessages) {
      return;
    }

    setIsLoadingMore(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const olderMessages = generateOlderMessages();
      
      if (olderMessages.length > 0) {
        const uniqueMessages = olderMessages.filter(msg => !messageIds.current.has(msg.id));
        uniqueMessages.forEach(msg => messageIds.current.add(msg.id));
        setMessages(prev => [...prev, ...uniqueMessages]);
      }
      
      if (totalMessagesGenerated.current >= 200) {
        setHasMoreMessages(false);
      }
      
    } catch (error) {
      console.error('Error loading older messages:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMoreMessages]);

  const generateOlderMessages = () => {
    const messageTemplates = [
      "Hey, how was your weekend?",
      "Did you see the news today?",
      "I'm working on a new project",
      "Thanks for your help earlier",
      "Let's catch up soon",
      "Hope you're having a good day",
      "The weather is nice today",
      "I just finished reading a great book",
      "What are your plans for tonight?",
      "I learned something interesting today"
    ];

    const count = Math.min(CHAT_CONFIG.MESSAGES_PER_PAGE, 200 - totalMessagesGenerated.current);
    const olderMessages = [];
    
    const earliestTimestamp = messages.length > 0 
      ? Math.min(...messages.map(m => m.timestamp))
      : new Date("2025-08-10T10:15:00Z").getTime();
    
    for (let i = 0; i < count; i++) {
      const isFromCurrentUser = Math.random() > 0.6;
      const timestamp = earliestTimestamp - ((i + 1) * 300000);
      
      olderMessages.push({
        id: `older_${timestamp}_${i}`,
        text: messageTemplates[Math.floor(Math.random() * messageTemplates.length)],
        senderId: isFromCurrentUser ? 'u001' : 'u002',
        timestamp,
        status: isFromCurrentUser ? 'read' : null
      });
    }
    
    totalMessagesGenerated.current += count;
    return olderMessages;
  };

  const onScroll = useCallback((event) => {
    const { contentOffset } = event.nativeEvent;
    const isNearBottom = contentOffset.y < 100;
    
    setScrollPosition({
      y: contentOffset.y,
      isNearBottom
    });
  }, []);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    const visibleMessageIds = viewableItems
      .filter(item => item.item && item.item.senderId !== 'u001')
      .map(item => item.item.id);
    
    return visibleMessageIds;
  }, []);

  const scrollToBottom = useCallback((animated = true) => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated });
  }, []);

  const getItemLayout = useCallback((data, index) => {
    const ESTIMATED_ITEM_HEIGHT = 80;
    return {
      length: ESTIMATED_ITEM_HEIGHT,
      offset: ESTIMATED_ITEM_HEIGHT * index,
      index,
    };
  }, []);

  const keyExtractor = useCallback((item, index) => {
    return item.id || `message-${index}`;
  }, []);

  const removeMessage = useCallback((messageId) => {
    messageIds.current.delete(messageId);
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  }, []);

  const removeTypingIndicators = useCallback(() => {
    setMessages(prev => prev.filter(msg => msg.type !== 'typing'));
  }, []);

  return {
    messages,
    isLoadingMore,
    hasMoreMessages,
    scrollPosition,
    flatListRef,
    addMessage,
    addMessages,
    removeMessage,
    removeTypingIndicators,
    loadOlderMessages,
    onScroll,
    onViewableItemsChanged,
    scrollToBottom,
    getItemLayout,
    keyExtractor,
    setMessages
  };
};