import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { createChatScreenStyles } from '../styles/ChatScreenStyles';
import { initialChatData, CHAT_PARTICIPANTS } from '../data/initialChatData';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useMessageSimulation } from '../hooks/useMessageSimulation';
import { useMessageInput } from '../hooks/useMessageInput';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import SimulationPanel from '../components/SimulationPanel';
import ScrollToBottomButton from '../components/ScrollToBottomButton';
import { USERS } from '../constants/config';

const ChatScreen = () => {
  const [showSimulationPanel, setShowSimulationPanel] = useState(false);
  const [lastReadMessageId, setLastReadMessageId] = useState('m008');
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const [wasAtBottom, setWasAtBottom] = useState(true);
  const insets = useSafeAreaInsets();
  const { colors, spacing, fontSizes, fontWeights, shadows, borderRadius, toggleTheme } = useTheme();
  
  const styles = useMemo(() => 
    createChatScreenStyles(colors, spacing, fontSizes, fontWeights, shadows, borderRadius),
    [colors, spacing, fontSizes, fontWeights, shadows, borderRadius]
  );

  const {
    messages,
    isLoadingMore,
    hasMoreMessages,
    scrollPosition,
    flatListRef,
    addMessage,
    removeMessage,
    removeTypingIndicators,
    loadOlderMessages,
    onScroll,
    onViewableItemsChanged,
    scrollToBottom,
    getItemLayout,
    keyExtractor
  } = useInfiniteScroll(initialChatData.messages);

  const handleMessageGenerated = useCallback((message, type, messageIdToRemove) => {
    if (type === 'remove') {
      removeMessage(messageIdToRemove);
      return;
    }
    
    if (message) {
      if (message.type === 'typing') {
        addMessage(message);
      } else {
        removeTypingIndicators();
        addMessage(message);
        
        if (message.senderId === USERS.OTHER_USER.id) {
          if (!scrollPosition.isNearBottom) {
            setNewMessagesCount(prev => prev + 1);
            setWasAtBottom(false);
          } else {
            setTimeout(() => {
              setLastReadMessageId(message.id);
            }, 500);
          }
        }
      }
    }
  }, [addMessage, removeMessage, removeTypingIndicators, scrollPosition]);

  const {
    isActive: isSimulationActive,
    mode: simulationMode,
    stats: simulationStats,
    startSimulation,
    stopSimulation,
    sendSingleMessage,
    sendBurstMessages,
    showTypingIndicator,
    respondToMessage,
    toggleMode,
    formatUptime,
    getTimeUntilNextMessage
  } = useMessageSimulation(handleMessageGenerated);

  const handleSendMessage = useCallback(async (message) => {
    addMessage(message);
    
    setTimeout(() => {
      scrollToBottom();
      setNewMessagesCount(0);
      setWasAtBottom(true);
    }, 100);
    
    if (simulationMode === 'contextual') {
      respondToMessage(message);
    }
    
    return Promise.resolve();
  }, [addMessage, simulationMode, respondToMessage, scrollToBottom]);

  React.useEffect(() => {
    if (scrollPosition.isNearBottom && newMessagesCount > 0) {
      const timeout = setTimeout(() => {
        setNewMessagesCount(0);
        setWasAtBottom(true);
        const latestOtherMessage = messages.find(msg => msg.senderId === USERS.OTHER_USER.id);
        if (latestOtherMessage) {
          setLastReadMessageId(latestOtherMessage.id);
        }
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [scrollPosition.isNearBottom, newMessagesCount, messages]);

  const {
    inputText,
    isValid,
    error,
    isSending,
    inputRef,
    handleTextChange,
    sendMessage,
    clearInput,
    focusInput
  } = useMessageInput(handleSendMessage);

  const showScrollToBottom = !scrollPosition.isNearBottom;

  const handleScrollToBottom = useCallback(() => {
    scrollToBottom();
    setNewMessagesCount(0);
    setWasAtBottom(true);
    const latestOtherMessage = messages.find(msg => msg.senderId === USERS.OTHER_USER.id);
    if (latestOtherMessage) {
      setLastReadMessageId(latestOtherMessage.id);
    }
  }, [scrollToBottom, messages]);

  const handleViewableItemsChanged = useCallback((info) => {
    const visibleOtherUserMessages = info.viewableItems
      .filter(item => 
        item.item && 
        item.item.senderId === USERS.OTHER_USER.id &&
        item.item.type !== 'typing'
      )
      .map(item => item.item);

    if (visibleOtherUserMessages.length > 0) {
      const mostRecentVisible = visibleOtherUserMessages
        .sort((a, b) => b.timestamp - a.timestamp)[0];
      
      setLastReadMessageId(mostRecentVisible.id);
    }
  }, []);

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
        <Image 
          source={{ uri: CHAT_PARTICIPANTS.OTHER_USER.profilePicture }} 
          style={styles.headerAvatar}
        />
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{CHAT_PARTICIPANTS.OTHER_USER.name}</Text>
          <Text style={styles.headerSubtitle}>
            {isSimulationActive ? 'Simulating...' : 'Online'}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            onPress={toggleTheme}
            style={[styles.headerButton, { marginRight: spacing.sm }]}
          >
            <Text style={styles.headerButtonText}>🌙</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setShowSimulationPanel(!showSimulationPanel)}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>⚙</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <MessageList
          messages={messages}
          isLoadingMore={isLoadingMore}
          hasMoreMessages={hasMoreMessages}
          flatListRef={flatListRef}
          onLoadMore={loadOlderMessages}
          onScroll={onScroll}
          onViewableItemsChanged={handleViewableItemsChanged}
          getItemLayout={getItemLayout}
          keyExtractor={keyExtractor}
          lastReadMessageId={lastReadMessageId}
        />
        
        <ScrollToBottomButton
          visible={showScrollToBottom}
          unreadCount={newMessagesCount}
          onPress={handleScrollToBottom}
        />
        
        {showSimulationPanel && (
          <SimulationPanel
            isActive={isSimulationActive}
            mode={simulationMode}
            stats={simulationStats}
            onStartSimulation={startSimulation}
            onStopSimulation={stopSimulation}
            onSendSingle={sendSingleMessage}
            onSendBurst={sendBurstMessages}
            onShowTyping={showTypingIndicator}
            onToggleMode={toggleMode}
            formatUptime={formatUptime}
            getTimeUntilNextMessage={getTimeUntilNextMessage}
          />
        )}
      </View>

      <MessageInput
        inputText={inputText}
        isValid={isValid}
        error={error}
        isSending={isSending}
        inputRef={inputRef}
        onTextChange={handleTextChange}
        onSend={sendMessage}
      />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;