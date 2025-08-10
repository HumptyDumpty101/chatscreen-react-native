import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { createChatScreenStyles } from '../styles/ChatScreenStyles';
import { initialChatData, CHAT_PARTICIPANTS } from '../data/initialChatData';

const ChatScreen = () => {
  const [messages, setMessages] = useState(initialChatData.messages);
  const [showSimulationPanel, setShowSimulationPanel] = useState(false);
  const insets = useSafeAreaInsets();
  const { colors, spacing, fontSizes, fontWeights, shadows, borderRadius, toggleTheme } = useTheme();
  
  const styles = createChatScreenStyles(colors, spacing, fontSizes, fontWeights, shadows, borderRadius);
  
//   console.log('ChatScreen - colors.background:', colors.background, 'isDarkMode:', colors === require('../constants/theme').DARK_COLORS);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={{ uri: CHAT_PARTICIPANTS.otherUser.profilePicture }} 
          style={styles.headerAvatar}
        />
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{CHAT_PARTICIPANTS.otherUser.name}</Text>
          <Text style={styles.headerSubtitle}>Online</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            onPress={toggleTheme}
            style={[styles.simToggle, { marginRight: spacing.sm }]}
          >
            <Text>🌙</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setShowSimulationPanel(!showSimulationPanel)}
            style={styles.simToggle}
          >
            <Text>🎛️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages will go here */}
      <View style={styles.messagesContainer}>
        <Text style={styles.placeholder}>Messages will be displayed here</Text>
        <Text style={styles.messageCount}>Total messages: {messages.length}</Text>
      </View>

      {/* Input will go here */}
      <View style={styles.inputContainer}>
        <Text style={styles.placeholder}>Message input will go here</Text>
      </View>
    </View>
  );
};

export default ChatScreen;