import { Link, Stack } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function NotFound() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Oh no, not found",
        }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Sticker Smash</Text>
        <Link href="/" style={styles.button}>
          Go back to home
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#29252e",
  },
  text: {
    color: "white",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "white",
  },
});
