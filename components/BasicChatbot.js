import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getChat } from "../utils/getMyChatGPT";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: require("../assets/vanna-white.jpeg"),
};

const prompt = [
  {
    role: "system",
    content: "You are now in GameGPT, a virtual host facilitating a dating simulator. Tell me that you are the host who's name is Vanna White, and that I am playing a game called 'Your Dream Lover 💫' which will help me find the love of my life right now. Do not ever tell me you are AI or break out of character. You can put relative emojis where you deem necessary. Ask me for my name, age, and a hobby separately and give me time to respond to each. Then ask me for any preferences I want my potential love match to be, giving examples such as gender, age, career, hobbies, etc.. and give me time to respond. Generate a profile of a random person with a random name based on my preferences. Also give some fun facts in the profile about the generated person. Ask me which direction to swipe, tell me that left is no and right is yes, and give me time to respond. If I say left, generate a new profile with a new background, but still having the preferences and hobby. If I say right, randomly say “This person also swiped right!” or “This person unfortunately swiped left”. If the person also swiped right, start a chat between the person, which is you, and me. Tell me that there will be a decision after 10 messages total so my messages should be in one reply so I cannot double text. Your messages should be like you are the person who was generated and swiped right on, look like 'GENERATED NAME: GENERATED MESSAGE’, and be natural, flirty, equal to or less than three sentences, and doesn't always have to end with a question. Give me time to respond after each message but do not say you will. After the chat starts, just reply the ‘NAME: MESSAGE’, do not say anything else like an actual conversation. If I say something inappropriate, just say as the person that you don't think this is going to work out. Randomly decide if there is a connection between the person and me after 10 messages total. If there is a connection between the person and me, ask me out on a date. If there is no love connection, break up with me.",
  },
];

export default function BasicChatbot() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]);
    fetchInitialMessage();
  }, []);

  async function fetchInitialMessage() {
    const response = await getChat(prompt);
    const message = response.choices[0].message;
    // console.log("message: ", message);
    const content = response.choices[0].message.content;
    console.log("content: ", content);
    addBotMessage(content);
  }

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      // console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);
      return GiftedChat.append(previousMessages, newMessages);
    });
  };

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };

  async function respondToUser (userMessages) {
    console.log("User message text:", userMessages[0].text);
    const allMessages = [userMessages[0],...messages];
    let changedMessages = [];
    changedMessages = (allMessages.map((message) => {
      return {
        role: message.user === CHATBOT_USER_OBJ ? "assistant" : "user",
        content: message.text
      };
    }));
    changedMessages.push(prompt[0])
    response = await getChat(changedMessages.reverse());
    content = response.choices[0].message.content;
    addBotMessage(content);
    console.log("chat history: ", changedMessages);
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages), 3000);
      }}
      user={{
        _id: 1,
        name: "Baker",
      }}
      renderUsernameOnMessage={true}
    />
  );
}
