import React, { memo } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { CHAT_CONFIG } from '../constants/config';

const MessageInput = memo(({
  inputText,
  isValid,
  error,
  isSending,
  inputRef,
  onTextChange,
  onSend
}) => {
  const { colors, spacing, fontSizes, fontWeights, borderRadius } = useTheme();
  const insets = useSafeAreaInsets();
  const [inputHeight, setInputHeight] = React.useState(20); // Dynamic height state

  const styles = {
    container: {
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      paddingBottom: spacing.sm + insets.bottom, // Add bottom safe area padding
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: 44,
    },
    textInputWrapper: {
      flex: 1,
      backgroundColor: colors.inputBackground,
      borderRadius: borderRadius.xl,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      marginRight: spacing.sm,
      minHeight: 44,
      maxHeight: Math.min(120, Math.max(44, inputHeight + (spacing.sm * 2))),
    },
    textInput: {
      fontSize: fontSizes.md,
      color: colors.inputText,
      textAlignVertical: 'top',
      minHeight: Math.max(20, inputHeight),
      maxHeight: 100,
      lineHeight: fontSizes.md * 1.3,
      paddingVertical: 0,
    },
    sendButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.buttonPrimary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButtonDisabled: {
      backgroundColor: colors.buttonDisabled,
    },
    sendButtonText: {
      color: colors.buttonPrimaryText,
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.semiBold,
    },
    sendButtonTextDisabled: {
      color: colors.buttonDisabledText,
    },
    errorText: {
      color: colors.error,
      fontSize: fontSizes.sm,
      marginTop: spacing.xs,
      marginHorizontal: spacing.md,
    },
    characterCount: {
      position: 'absolute',
      bottom: 4,
      right: spacing.sm,
      fontSize: fontSizes.xs,
      color: colors.textSecondary,
    },
    characterCountWarning: {
      color: colors.warning,
    },
    characterCountError: {
      color: colors.error,
    }
  };

  const characterCount = inputText.length;
  const isNearLimit = characterCount > CHAT_CONFIG.MAX_MESSAGE_LENGTH * 0.8;
  const isOverLimit = characterCount > CHAT_CONFIG.MAX_MESSAGE_LENGTH;

  const handleSend = () => {
    if (isValid && !isSending) {
      onSend();
    }
  };

  const handleContentSizeChange = (event) => {
    const { height } = event.nativeEvent.contentSize;
    const lineHeight = fontSizes.md * 1.3;
    const maxLines = 4; // expand for about 4 lines, then scroll
    const maxAutoHeight = lineHeight * maxLines;
    
    setInputHeight(Math.min(height, maxAutoHeight));
  };

  return (
    <View style={styles.container}>
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        
        <View style={styles.inputContainer}>
          <View style={styles.textInputWrapper}>
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              value={inputText}
              onChangeText={onTextChange}
              onContentSizeChange={handleContentSizeChange}
              placeholder="Type a message..."
              placeholderTextColor={colors.inputPlaceholder}
              multiline={true}
              maxLength={CHAT_CONFIG.MAX_MESSAGE_LENGTH + 50}
              returnKeyType="default"
              blurOnSubmit={false}
              editable={!isSending}
              scrollEnabled={inputHeight >= (fontSizes.md * 1.3 * 4)} // Only scroll after 4 lines
              enablesReturnKeyAutomatically={false}
              textAlignVertical="top"
            />
            
            {(isNearLimit || isOverLimit) && (
              <Text style={[
                styles.characterCount,
                isOverLimit && styles.characterCountError,
                !isOverLimit && isNearLimit && styles.characterCountWarning
              ]}>
                {characterCount}/{CHAT_CONFIG.MAX_MESSAGE_LENGTH}
              </Text>
            )}
          </View>
          
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!isValid || isSending) && styles.sendButtonDisabled
            ]}
            onPress={handleSend}
            disabled={!isValid || isSending}
            activeOpacity={0.7}
          >
            {isSending ? (
              <ActivityIndicator size="small" color={colors.textLight} />
            ) : (
              <Text style={[
                styles.sendButtonText,
                (!isValid || isSending) && styles.sendButtonTextDisabled
              ]}>
                ⌲
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
  );
});

MessageInput.displayName = 'MessageInput';

export default MessageInput;