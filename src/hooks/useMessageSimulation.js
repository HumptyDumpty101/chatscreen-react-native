import { useState, useEffect, useCallback, useRef } from 'react';
import simulationService from '../services/simulationService';

export const useMessageSimulation = (onMessageGenerated) => {
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('auto');
  const [stats, setStats] = useState({
    messagesSent: 0,
    uptime: 0,
    nextMessage: null
  });
  
  const lastUserMessageRef = useRef(null);

  useEffect(() => {
    const removeListener = simulationService.addListener((event, data) => {
      switch (event) {
        case 'started':
          setIsActive(true);
          setMode(data.mode);
          break;
        case 'stopped':
          setIsActive(false);
          break;
        case 'statsUpdate':
          setStats(data);
          break;
        case 'messageSent':
          setStats(prev => ({
            ...prev,
            messagesSent: prev.messagesSent + 1
          }));
          break;
      }
    });

    return removeListener;
  }, []);

  const startSimulation = useCallback((simulationMode = 'auto') => {
    simulationService.start(simulationMode, (message) => {
      if (message.remove) {
        onMessageGenerated(null, 'remove', message.id);
      } else {
        onMessageGenerated(message, 'simulation');
      }
    });
  }, [onMessageGenerated]);

  const stopSimulation = useCallback(() => {
    simulationService.stop();
  }, []);

  const sendSingleMessage = useCallback(async () => {
    await simulationService.sendSingleMessage();
  }, []);

  const sendBurstMessages = useCallback(async () => {
    await simulationService.sendBurstMessages();
  }, []);

  const showTypingIndicator = useCallback(async () => {
    await simulationService.showTypingIndicator();
  }, []);

  const respondToMessage = useCallback(async (userMessage) => {
    if (!isActive && mode === 'contextual') {
      lastUserMessageRef.current = userMessage;
      
      setTimeout(async () => {
        await simulationService.showTypingIndicator();
        
        setTimeout(async () => {
          try {
            const response = await simulationService.generateMessage('contextual', userMessage);
            onMessageGenerated(response, 'contextual');
          } catch (error) {
            console.error('Error generating contextual response:', error);
          }
        }, 1500);
      }, 2000);
    }
  }, [isActive, mode, onMessageGenerated]);

  const toggleMode = useCallback((newMode) => {
    setMode(newMode);
    if (isActive) {
      simulationService.stop();
      simulationService.start(newMode, onMessageGenerated);
    }
  }, [isActive, onMessageGenerated]);

  const getTimeUntilNextMessage = useCallback(() => {
    if (!stats.nextMessage) return 0;
    return Math.max(0, stats.nextMessage - Date.now());
  }, [stats.nextMessage]);

  const formatUptime = useCallback(() => {
    const seconds = Math.floor(stats.uptime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  }, [stats.uptime]);

  return {
    isActive,
    mode,
    stats,
    startSimulation,
    stopSimulation,
    sendSingleMessage,
    sendBurstMessages,
    showTypingIndicator,
    respondToMessage,
    toggleMode,
    getTimeUntilNextMessage,
    formatUptime
  };
};