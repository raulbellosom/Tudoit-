import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseConfig } from "../firebase.config";
import { useToast } from "react-native-toast-notifications";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const CreateTask = ({
  isAddTaks,
  setIsAddTaks,
  user,
  setIsNewTask,
  isNewTask,
}) => {
  const { uid } = user;
  const [errors, setErrors] = useState("");
  const [isError, setIsError] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const toast = useToast();

  const handleUploadDoc = async () => {
    if (!taskName.length) {
      setErrors("El nombre de la tarea es obligatorio.");
      setIsError(true);
    } else {
      try {
        await addDoc(collection(db, "tasks"), {
          idUser: uid,
          name: taskName,
          description: taskDescription,
          isCompleted: false,
          createdAt: new Date(),
        });
        setErrors("");
        setIsError(false);
        setIsAddTaks(false);
        toast.show("Tarea registrada con exito.", {
          type: "success",
          successColor: "#5d58d7",
          placement: "center",
          duration: 4000,
          offset: 30,
          animationType: "slide-in | zoom-in",
        });
        setIsNewTask(true);
      } catch (e) {
        setErrors("No se ha podido registrar la tarea, intentelo más tarde.");
        setIsError(true);
        toast.show("Fallo al intentar crear un Tudoit, intente más tarde.", {
          type: "danger",
          placement: "center",
          duration: 4000,
          offset: 50,
          animationType: "slide-in | zoom-in",
        });
      }
      setIsNewTask(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Tuduit</Text>
      <Input
        placeholder="Nombre del Tudoit "
        onChangeText={(text) => {
          setTaskName(text);
        }}
        leftIcon={{ type: "entypo", name: "add-to-list", color: "#F99E4C" }}
      />
      <Input
        placeholder="Descripción"
        style={styles.textArea}
        onChangeText={(text) => {
          setTaskDescription(text);
        }}
        multiline
        leftIcon={{ type: "entypo", name: "new-message", color: "#F99E4C" }}
      />
      {isError && (
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Icon type="ant-design" name="warning" color={"#E53860"} />
          <Text style={styles.error}> {errors}</Text>
        </View>
      )}
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
          handleUploadDoc();
        }}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e4f5ff",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    width: "90%",
    maxWidth: 350,
    maxHeight: 350,
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
  error: {
    fontSize: 16,
    color: "#E53860",
    paddingVertical: 5,
  },
});
