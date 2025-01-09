import { Text, View, StyleSheet } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About</Text>
    </View>
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
});
