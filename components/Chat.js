import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { Themes } from "../assets/Themes";
import { useNavigation } from "@react-navigation/native";

const Chat = ({
  index,
  imageUrl,
  chatTitle,
  chatSource,
  chatName,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ChatScreen", {
          chatbotName: chatName,
        })
      }
    >
      <View style={styles.chat}>
        <Text style={styles.index}>{index + 1}</Text>
        <Image
          style={[styles.image, styles.chatCover]}
          source={ imageUrl }
        />
        <View style={styles.chatSourceContainer}>
          <Text style={[styles.chatTitle]} numberOfLines={1}>
            {chatTitle}
          </Text>
          <Text style={styles.chatSource} numberOfLines={1}>
            {chatSource}
          </Text>
        </View>
        <Text style={[styles.chatName]} numberOfLines={1}>
          {chatName}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chat: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  index: {
    color: Themes.colors.gray,
    flex: 0.05,
    textAlign: "center",
    fontSize: 12,
    margin: 1,
  },
  chatCover: {
    resizeMode: "contain",
    flex: 0.2,
    width: 50,
    height: 50,
  },
  chatSourceContainer: {
    flex: 0.4,
    margin: 5,
  },
  chatTitle: {
    color: Themes.colors.white,
    fontSize: 12,
  },
  chatSource: {
    color: Themes.colors.gray,
    fontSize: 12,
  },
  chatName: {
    color: Themes.colors.white,
    flex: 0.25,
    fontSize: 12,
    margin: 5,
  },
});

export default Chat;
