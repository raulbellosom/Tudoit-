import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Icon, Button } from "@rneui/themed";

export const CreateTask = ({ isAddTaks, setIsAddTaks }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Tuduit</Text>
      <Input
        placeholder="Nombre del Tudoit "
        leftIcon={{ type: "entypo", name: "add-to-list", color: "#F99E4C" }}
      />
      <Input
        placeholder="Descripción"
        style={styles.textArea}
        multiline
        leftIcon={{ type: "entypo", name: "new-message", color: "#F99E4C" }}
      />
      <View style={styles.iconClose}>
        <Icon
          onPress={() => {
            setIsAddTaks(!isAddTaks);
          }}
          name="close"
          type="font-awesome"
          color="#F99E4C"
        />
      </View>
      <Button
        title=""
        icon={{
          name: "add-task",
          type: "material-icons",
          size: 25,
          color: "white",
        }}
        buttonStyle={{
          backgroundColor: "#F99E4C",
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onPress={() => {
          setIsAddTaks(!isAddTaks);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: "white",
    width: "85%",
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#F99E4C",
    padding: 10,
    fontSize: 18,
  },
  textArea: {
    height: 100,
  },
  iconClose: {
    position: "absolute",
    padding: 5,
    paddingRight: 10,
    right: 0,
  },
});
