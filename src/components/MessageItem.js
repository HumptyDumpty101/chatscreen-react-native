import React, { memo } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { createMessageStyles } from '../styles/MessageStyles';
import { formatMessageTime } from '../utils/formatTime';
import { USERS } from '../constants/config';

const TypingDots = memo(() => {
  const dots = [
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ];

  React.useEffect(() => {
    const animations = dots.map((dot, index) => 
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 200),
          Animated.timing(dot, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      )
    );

    animations.forEach(animation => animation.start());

    return () => animations.forEach(animation => animation.stop());
  }, []);

  const { colors, spacing, fontSizes, fontWeights, borderRadius } = useTheme();
  const styles = createMessageStyles(colors, spacing, fontSizes, fontWeights, borderRadius);

  return (
    <View style={styles.typingDots}>
      {dots.map((dot, index) => (
        <Animated.View
          key={index}
          style={[
            styles.typingDot,
            {
              opacity: dot,
              transform: [{
                translateY: dot.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -4],
                }),
              }],
            },
          ]}
        />
      ))}
    </View>
  );
});

const MessageItem = memo(({ 
  message, 
  isConsecutive = false,
  showUnreadDivider = false 
}) => {
  const { colors, spacing, fontSizes, fontWeights, borderRadius } = useTheme();
  const styles = createMessageStyles(colors, spacing, fontSizes, fontWeights, borderRadius);
  
  const isCurrentUser = message.senderId === USERS.CURRENT_USER.id;
  const showAvatar = !isCurrentUser && !isConsecutive;
  
  if (message.type === 'typing') {
    return (
      <View style={styles.messageContainer}>
        <View style={styles.messageWrapperOther}>
          <Image 
            source={{ uri: USERS.OTHER_USER.profilePicture }}
            style={styles.avatar}
          />
          <View style={[styles.messageBubble, styles.messageBubbleOther, styles.typingIndicator]}>
            <TypingDots />
          </View>
        </View>
      </View>
    );
  }

  return (
    <>
      {showUnreadDivider && (
        <View style={styles.unreadDivider}>
          <View style={styles.unreadLine} />
          <Text style={styles.unreadText}>New messages</Text>
          <View style={styles.unreadLine} />
        </View>
      )}
      
      <View style={[styles.messageContainer, isConsecutive && styles.consecutiveMessage]}>
        <View style={isCurrentUser ? styles.messageWrapper : styles.messageWrapperOther}>
          {showAvatar && (
            <Image 
              source={{ uri: USERS.OTHER_USER.profilePicture }}
              style={styles.avatar}
            />
          )}
          
          <View style={[
            styles.messageBubble,
            !isCurrentUser && styles.messageBubbleOther,
            isConsecutive && (isCurrentUser ? styles.consecutiveBubble : styles.consecutiveBubbleOther)
          ]}>
            <Text style={[
              styles.messageText,
              !isCurrentUser && styles.messageTextOther
            ]}>
              {message.text}
            </Text>
          </View>
        </View>
        
        <Text style={[
          styles.messageTime,
          !isCurrentUser && styles.messageTimeOther
        ]}>
          {formatMessageTime(message.timestamp)}
          {isCurrentUser && message.status && (
            <Text style={styles.messageStatus}>
              {message.status === 'sent' && ' ✓'}
              {message.status === 'delivered' && ' ✓✓'}
              {message.status === 'read' && ' ✓✓'}
            </Text>
          )}
        </Text>
      </View>
    </>
  );
});

MessageItem.displayName = 'MessageItem';

export default MessageItem;