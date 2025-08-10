export const API_CONFIG = {
  DUMMY_JSON: {
    BASE_URL: 'https://dummyjson.com',
    COMMENTS: 'https://dummyjson.com/comments',
    USERS: 'https://dummyjson.com/users'
  },
  FALLBACK: {
    COMMENTS: 'https://jsonplaceholder.typicode.com/comments',
    USERS: 'https://jsonplaceholder.typicode.com/users'
  },
  AVATARS: {
    BASE_URL: 'https://api.dicebear.com/7.x/avataaars/png',
    SIZE: 40
  }
};

export const CHAT_CONFIG = {
  MESSAGES_PER_PAGE: 25,
  MAX_MESSAGE_LENGTH: 500,
  MIN_MESSAGE_LENGTH: 1,
  SCROLL_THRESHOLD: 0.1,
  TYPING_DELAY: 1500,
  MAX_CACHED_MESSAGES: 1000,
  API_TIMEOUT: 5000,
  RATE_LIMIT_DELAY: 5000
};

export const SIMULATION_CONFIG = {
  AUTO_MODE: {
    MIN_DELAY: 10000,
    MAX_DELAY: 30000
  },
  BURST_MODE: {
    MESSAGE_COUNT: 3,
    DELAY_BETWEEN: 2000
  },
  CONTEXTUAL_RESPONSES: {
    greeting: ['Hey! How are you?', 'Hi there! Good to see you', 'Hello! How has your day been?'],
    work: ['How is the project going?', 'Any updates on your tasks?', 'Need help with anything?'],
    casual: ['Nice weather today!', 'What are you up to?', 'Hope you are having a great day!'],
    question: ['That is a good question!', 'Let me think about that', 'Interesting point!'],
    default: ['I see', 'That sounds good', 'Thanks for sharing!', 'Absolutely!']
  }
};

export const USERS = {
  CURRENT_USER: {
    id: 'u001',
    name: 'Rohit Sharma',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/png?seed=rohit&size=40'
  },
  OTHER_USER: {
    id: 'u002', 
    name: 'Priya Singh',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/png?seed=priya&size=40'
  }
};