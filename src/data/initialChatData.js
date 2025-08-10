export const CHAT_PARTICIPANTS = {
  currentUser: {
    userId: "u001",
    name: "Rohit Sharma",
    profilePicture: `https://api.dicebear.com/7.x/avataaars/png?seed=rohit&size=40`
  },
  otherUser: {
    userId: "u002", 
    name: "Priya Singh",
    profilePicture: `https://api.dicebear.com/7.x/avataaars/png?seed=priya&size=40`
  }
};

export const CURRENT_USER_ID = "u001"; // For Demo assume Rohit Sharma is always the current user

export const initialChatData = {
  "chatId": "c123456",
  "participants": [
    CHAT_PARTICIPANTS.currentUser,
    CHAT_PARTICIPANTS.otherUser
  ],
  "messages": [
    {
      "messageId": "m001",
      "senderId": "u001",
      "text": "Hey Priya! How's your day going?",
      "timestamp": "2025-08-10T10:15:23Z",
      "isCurrentUser": true
    },
    {
      "messageId": "m002",
      "senderId": "u002",
      "text": "Hi Rohit! Pretty good so far, just had coffee ☕. You?",
      "timestamp": "2025-08-10T10:16:02Z",
      "isCurrentUser": false
    },
    {
      "messageId": "m003",
      "senderId": "u001",
      "text": "Nice! I'm working on that project we discussed yesterday.",
      "timestamp": "2025-08-10T10:17:10Z",
      "isCurrentUser": true
    },
    {
      "messageId": "m004",
      "senderId": "u002",
      "text": "Oh, the marketing dashboard one?",
      "timestamp": "2025-08-10T10:17:25Z",
      "isCurrentUser": false
    },
    {
      "messageId": "m005",
      "senderId": "u001",
      "text": "Yep. Almost done with the UI part.",
      "timestamp": "2025-08-10T10:18:04Z",
      "isCurrentUser": true
    },
    {
      "messageId": "m006",
      "senderId": "u002",
      "text": "That's quick! Need any help with the API integration?",
      "timestamp": "2025-08-10T10:18:35Z",
      "isCurrentUser": false
    },
    {
      "messageId": "m007",
      "senderId": "u001",
      "text": "Actually yes, can you check the auth flow later?",
      "timestamp": "2025-08-10T10:19:12Z",
      "isCurrentUser": true
    },
    {
      "messageId": "m008",
      "senderId": "u002",
      "text": "Sure. Send me the repo link when you're ready.",
      "timestamp": "2025-08-10T10:19:46Z",
      "isCurrentUser": false
    },
    {
      "messageId": "m009",
      "senderId": "u001",
      "text": "Will do. Also, I found a bug in the old version.",
      "timestamp": "2025-08-10T10:20:15Z",
      "isCurrentUser": true
    },
    {
      "messageId": "m010",
      "senderId": "u002",
      "text": "Oh no 😅. Was it breaking something major?",
      "timestamp": "2025-08-10T10:20:42Z",
      "isCurrentUser": false
    },
    {
      "messageId": "m011",
      "senderId": "u001",
      "text": "Not major, but it was causing extra API calls.",
      "timestamp": "2025-08-10T10:21:05Z",
      "isCurrentUser": true
    },
    {
      "messageId": "m012",
      "senderId": "u002",
      "text": "Got it. Let's fix that before the release then.",
      "timestamp": "2025-08-10T10:21:30Z",
      "isCurrentUser": false
    }
  ]
};