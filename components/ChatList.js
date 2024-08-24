import { FlatList, View, StyleSheet } from "react-native";
import { Themes } from "../assets/Themes";
import Chat from "./Chat";

const renderChat = ({ item, index }) => (
  <Chat
    index={index}
    imageUrl={item.imageUrl}
    chatTitle={item.name}
    chatSource={"developer"}
    chatName={item.id}
  />
);

export default function ChatList({ chats }) {
  // console.log("chats", chats);
  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={(item, index) => renderChat(item, index)}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    marginTop: 20,
    marginLeft: 5,
    marginBottom: 20,
  },
  text: {
    color: Themes.colors.gray,
  },
});
