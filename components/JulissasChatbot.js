import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const CHATBOT_USER_OBJ = [{
  _id: 2,
  name: "React Native Chatbot",
  avatar: require("../assets/julissa-bitmoji.jpeg")
  }];

export default function TriviaChatbot() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (messages.length < 1) {
      // Add a "starting message" when chat UI first loads
      addBotMessage(
        "Hello, welcome to simple trivia! Say 'Yes' when you're ready to play!"
      );
    }
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      // console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);
      return GiftedChat.append(previousMessages, newMessages);
    });
  };
  const [level, setLevel] = useState(0)
  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ[1],
      },
    ]);
  };

  const [responseNum, setResponseNum] = useState(0)
  const responseObj = [
    {
    question: "In what year did women get the right to vote?", answer: "1920", wrong: "Not quite... the answer was 1920"
  },
  {
    quesion: "What is the only food that can never go bad?", answer: "Honey", wrong: "Type 'Another' for a different question"
  },
  {
    quesion: "What breed of cat doesn't have fur?", answer: "Sphynx", wrong: "Wrong, better luck next time! The correct answer was Sphynx"
  }
]
  const respondToUser = (userMessages) => {
    
    console.log("Recent user msg:", userMessages[0].text);
    if (responseNum == 0){
      setResponseNum(1)
      if (userMessages[0].text == 'Yes'){
        addBotMessage("Great!"); 
        addBotMessage(responseObj[0].question)
        setResponseNum(responseNum+1)
      }
      else{
        addBotMessage("Please say Yes")
        setResponseNum(0)
      }
    }

    if(responseNum == 1){
      setResponseNum(2)
      // addBotMessage(responseObj[responseNum-1].quesion)
      if(userMessages[0].text == responseObj[responseNum-1].answer){
        addBotMessage("Correct! Type 'Another' for a different question");
        
      }
      else{
        addBotMessage(responseObj[responseNum-1].wrong);
      }
    }
    if(responseNum == 2){
      setResponseNum(3)
      if(userMessages[0].text == 'Another'){
        addBotMessage("What is the only food that can never go bad?")
      }
      else{
        addBotMessage("Thats okay!")
        setResponseNum(6)
      }
    }
    if (responseNum == 3){
      setResponseNum(4)
      if(userMessages[0].text == 'Honey'){
        addBotMessage("Good job!")
        addBotMessage("Type 'Another' for a different question")
      }
      else{
        addBotMessage("Nope, the answer was Honey!")
        addBotMessage("Type 'Another' for a different question")
      }
    }
    if (responseNum == 4){
      setResponseNum(5)
      if(userMessages[0].text == 'Another'){
        addBotMessage("What breed of cat doesn't have fur?")
      }
      else{
        addBotMessage("Aw okay")
        setResponseNum(6)
      }
    }
    if (responseNum == 5){
      setResponseNum(6)
      if(userMessages[0].text == 'Sphynx'){
        addBotMessage("Yayyy")
      }
      else{
        addBotMessage("Wrong, better luck next time")
      }
    }

    

  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        // Wait a sec before responding
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "Baker",
      }}
      renderUsernameOnMessage={true}
    />
  );
}

// Workaround to hide an unnessary warning about defaultProps
const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};
