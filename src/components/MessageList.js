import React, { memo, useCallback } from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import MessageItem from './MessageItem';
import { useTheme } from '../contexts/ThemeContext';
import { CHAT_CONFIG, USERS } from '../constants/config';

const LoadingFooter = memo(({ isVisible }) => {
  const { colors, spacing } = useTheme();
  
  if (!isVisible) return null;
  
  return (
    <View style={{ 
      padding: spacing.md, 
      alignItems: 'center',
      backgroundColor: colors.background 
    }}>
      <ActivityIndicator size="small" color={colors.primary} />
      <Text style={{ 
        color: colors.textSecondary, 
        marginTop: spacing.xs,
        fontSize: 12
      }}>
        Loading older messages...
      </Text>
    </View>
  );
});

const MessageList = memo(({
  messages,
  isLoadingMore,
  hasMoreMessages,
  flatListRef,
  onLoadMore,
  onScroll,
  onViewableItemsChanged,
  getItemLayout,
  keyExtractor,
  lastReadMessageId = null
}) => {
  const { colors } = useTheme();

  const renderMessage = useCallback(({ item: message, index }) => {
    const previousMessage = index < messages.length - 1 ? messages[index + 1] : null;
    
    const isConsecutive = false;
    const showUnreadDivider = false;

    return (
      <MessageItem
        message={message}
        isConsecutive={isConsecutive}
        showUnreadDivider={showUnreadDivider}
      />
    );
  }, [messages, lastReadMessageId]);

  const renderFooter = useCallback(() => (
    <LoadingFooter isVisible={isLoadingMore && hasMoreMessages} />
  ), [isLoadingMore, hasMoreMessages]);

  const onEndReached = useCallback(() => {
    if (hasMoreMessages && !isLoadingMore) {
      onLoadMore();
    }
  }, [hasMoreMessages, isLoadingMore, onLoadMore]);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderMessage}
      keyExtractor={keyExtractor}
      inverted
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={CHAT_CONFIG.SCROLL_THRESHOLD}
      onScroll={onScroll}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      scrollEventThrottle={16}
      removeClippedSubviews={false}
      maxToRenderPerBatch={10}
      initialNumToRender={20}
      windowSize={10}
      updateCellsBatchingPeriod={100}
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
        autoscrollToTopThreshold: 10,
      }}
      ListFooterComponent={renderFooter}
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={messages.length === 0 ? {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      } : undefined}
      ListEmptyComponent={() => (
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: 40
        }}>
          <Text style={{ 
            color: colors.textSecondary,
            fontSize: 16,
            textAlign: 'center'
          }}>
            Start a conversation with {USERS.OTHER_USER.name}
          </Text>
        </View>
      )}
    />
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;