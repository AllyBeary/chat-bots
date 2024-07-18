import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const MASIEL_QUESTIONS = [
    {//empty to line up question number with entry
    },
    {
        text: "Let's rock 'n' roll! Q1: What's Masiel's Zodiac sign?", 
        hint: "Hint: she's a water sign. Known for being sensitive but carring", 
        answer: ["cancer"]
    },
    {
        text: "Q2: What is Masiel's favorite outdoor pastime?", 
        hint: "Hint: it has wheels", 
        answer: ["skating", "roller skating"]
    },
    {
        text: "Q3: What is Masiel's duck Ducky wanted for?", 
        hint: "Hint: type of crime having to do with fire", 
        answer: ["arsion"]
    },
    {
        text: "Q4: Which if Masiel's favorite Power Puff Girl?", 
        hint: "Hint: she wears green", 
        answer: ["buttercup"]
    }
]


const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: require("../assets/masiel-bitmoji.jpg"),
};

export default function BasicTrivia() {
  const [messages, setMessages] = useState([]);
  const [triviaNumber, setTriviaNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [point, setPoint] = useState(100);

  useEffect(() => {
    if (messages.length < 1) {
      // Add a "starting message" when chat UI first loads
      addBotMessage(
        "Hello, welcome to simple trivia! Say 'Start' when you're ready to play!"
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

  const respondToUser = (userMessages) => {
    // console.log(QUESTION_BANK);
    // console.log(QUESTION_BANK.length);
    // console.log(userMessages)
    let userName = userMessages[0].user.name;
    let userText = userMessages[0].text.toLowerCase();
    // console.log("Recent user msg:", userText);

    if(userText == "start" && triviaNumber === 0){
      addBotMessage(MASIEL_QUESTIONS[1].text);
      setTriviaNumber(1);
    } else if(triviaNumber === 0) {
      addBotMessage("Hello " + userName + ". Remember to text 'Start' when you're ready.");
    }

    if(triviaNumber > 0 && correctAnswer(triviaNumber, userText)) {
      setScore(score+point);
      addBotMessage("Correct!");
      setPoint(100);
      setTriviaNumber(triviaNumber+1);
      // console.log(triviaNumber, " : ", MASIEL_QUESTIONS.length);
      if(triviaNumber == MASIEL_QUESTIONS.length - 1){
        addBotMessage("CONGRATS! YOU BEAT THE GAME! Your final score was: " + score);
        addBotMessage("Resetting....");
        resetGame(setTriviaNumber, setScore);
        addBotMessage("Game is reset!");
      } else{
        addBotMessage(MASIEL_QUESTIONS[triviaNumber+1].text);
      }
    } 
    else if(triviaNumber > 0 && userText == "hint") {
      addBotMessage(MASIEL_QUESTIONS[triviaNumber].hint);
    } 
    else if(triviaNumber > 0) {
      addBotMessage("Nope sorry. Please try again. If you want a hint, type 'hint'. Points halved");
      setPoint(point/2);
      console.log(point);
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
        name: "Snap Scholar",
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

// Check if answer is in answer bank of given question
function correctAnswer(questionNumber, userAnswer){
  // console.log(userAnswer);
  // console.log(QUESTION_BANK[questionNumber].answer);
  return MASIEL_QUESTIONS[questionNumber].answer.find(
    (answerElem) => answerElem == userAnswer
  )
}

function resetGame(setTriviaNumber, setScore){
  setTriviaNumber(0);
  setScore(0);
}