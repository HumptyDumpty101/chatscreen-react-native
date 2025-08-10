export const formatMessageTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'now';
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d`;
  
  return date.toLocaleDateString();
};

export const formatFullTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const isToday = (timestamp) => {
  const date = new Date(timestamp);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isYesterday = (timestamp) => {
  const date = new Date(timestamp);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};