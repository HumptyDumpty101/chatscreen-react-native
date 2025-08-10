import { USERS } from '../constants/config';

export const CHAT_PARTICIPANTS = USERS;

export const initialChatData = {
  messages: [
    {
      id: "m012",
      senderId: USERS.OTHER_USER.id,
      text: "Got it. Let's fix that before the release then.",
      timestamp: new Date("2025-08-10T10:21:30Z").getTime(),
      status: null
    },
    {
      id: "m011",
      senderId: USERS.CURRENT_USER.id,
      text: "Not major, but it was causing extra API calls.",
      timestamp: new Date("2025-08-10T10:21:05Z").getTime(),
      status: "read"
    },
    {
      id: "m010",
      senderId: USERS.OTHER_USER.id,
      text: "Oh no 😅. Was it breaking something major?",
      timestamp: new Date("2025-08-10T10:20:42Z").getTime(),
      status: null
    },
    {
      id: "m009",
      senderId: USERS.CURRENT_USER.id,
      text: "Will do. Also, I found a bug in the old version.",
      timestamp: new Date("2025-08-10T10:20:15Z").getTime(),
      status: "delivered"
    },
    {
      id: "m008",
      senderId: USERS.OTHER_USER.id,
      text: "Sure. Send me the repo link when you're ready.",
      timestamp: new Date("2025-08-10T10:19:46Z").getTime(),
      status: null
    },
    {
      id: "m007",
      senderId: USERS.CURRENT_USER.id,
      text: "Actually yes, can you check the auth flow later?",
      timestamp: new Date("2025-08-10T10:19:12Z").getTime(),
      status: "read"
    },
    {
      id: "m006",
      senderId: USERS.OTHER_USER.id,
      text: "That's quick! Need any help with the API integration?",
      timestamp: new Date("2025-08-10T10:18:35Z").getTime(),
      status: null
    },
    {
      id: "m005",
      senderId: USERS.CURRENT_USER.id,
      text: "Yep. Almost done with the UI part.",
      timestamp: new Date("2025-08-10T10:18:04Z").getTime(),
      status: "delivered"
    },
    {
      id: "m004",
      senderId: USERS.OTHER_USER.id,
      text: "Oh, the marketing dashboard one?",
      timestamp: new Date("2025-08-10T10:17:25Z").getTime(),
      status: null
    },
    {
      id: "m003",
      senderId: USERS.CURRENT_USER.id,
      text: "Nice! I'm working on that project we discussed yesterday.",
      timestamp: new Date("2025-08-10T10:17:10Z").getTime(),
      status: "read"
    },
    {
      id: "m002",
      senderId: USERS.OTHER_USER.id,
      text: "Hi Rohit! Pretty good so far, just had coffee ☕. You?",
      timestamp: new Date("2025-08-10T10:16:02Z").getTime(),
      status: null
    },
    {
      id: "m001",
      senderId: USERS.CURRENT_USER.id,
      text: "Hey Priya! How's your day going?",
      timestamp: new Date("2025-08-10T10:15:23Z").getTime(),
      status: "read"
    }
  ]
};