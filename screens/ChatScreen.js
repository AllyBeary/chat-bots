import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform, Text } from "react-native";
import BasicChatbot from "../components/BasicChatbot";
import AllisonsChatbot from "../components/AllisonsChatbot";
import JulissasChatbot from "../components/JulissasChatbot";
import LuissChatbot from "../components/LuissChatbot";
import MasielsChatbot from "../components/MasielsChatbot";

export const CHATBOTS = {
  "BasicChatbot": {
    id: "BasicChatbot",
    name: "Your Dream Lover 💫",
    imageUrl: require("../assets/vanna-white.jpeg"),
    component: BasicChatbot,
  },
  "AllisonsChatbot": {
    id: "AllisonsChatbot",
    name: "Allison's Trivia",
    imageUrl: require("../assets/allison-bitmoji.jpg"),
    component: AllisonsChatbot, 
  },
  "JulissasChatbot": {
    id: "JulissasChatbot",
    name: "Julissa's Trivia",
    imageUrl: require("../assets/julissa-bitmoji.jpeg"),
    component: JulissasChatbot,
  },
  "LuissChatbot": {
    id: "LuissChatbot",
    name: "Luis's Hangman",
    imageUrl: require("../assets/luis-amongus.jpg"),
    component: LuissChatbot,
  },
  "MasielsChatbot": {
    id: "MasielsChatbot",
    name: "Masiel's Hangman",
    imageUrl: require("../assets/masiel-bitmoji.jpg"),
    component: MasielsChatbot,
  }
};

export default function ChatScreen({ route }) {
  const { chatbotName } = route.params;

  const makeChatbotComponent = (chatbotName) => {
    if (CHATBOTS[chatbotName]) {
      const Chatbot = CHATBOTS[chatbotName].component;
      return <Chatbot />;
    } else {
      return <Text>No Chatbot Found with name '{chatbotName}'</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {makeChatbotComponent(chatbotName)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
