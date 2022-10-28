import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Icon } from "@rneui/themed";

export const LogOut = ({ user, logOut, close }) => {
  const { displayName, email } = user;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ¿Realmente deseas cerrar sesión {displayName ?? "User"}?{" "}
      </Text>
      <Icon
        style={{ padding: 20 }}
        type="font-awesome-5"
        name="door-open"
        size={60}
        color="white"
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 10,
        }}
      >
        <Button
          title="Cerrar sesión"
          iconRight
          icon={{
            name: "login",
            type: "ant-design",
            size: 20,
            color: "white",
          }}
          buttonStyle={{
            backgroundColor: "#F99E4C",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
          }}
          onPress={() => {
            logOut();
          }}
        />
      </View>
      <View style={styles.iconClose}>
        <Icon
          onPress={() => {
            close(false);
          }}
          name="close"
          type="font-awesome"
          color="#e4f5ff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F99E4C",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    width: "90%",
    maxWidth: 300,
    maxHeight: 300,
  },
  regularText: {
    fontSize: 15,
    color: "white",
    color: "#e4f5ff",
    paddingTop: 0,
    paddingBottom: 5,
  },
  fields: {
    fontWeight: "bold",
    paddingVertical: 10,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#e4f5ff",
    padding: 10,
    fontSize: 18,
  },
  iconClose: {
    position: "absolute",
    padding: 5,
    paddingRight: 10,
    right: 0,
  },
});
