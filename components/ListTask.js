import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Divider } from "@rneui/themed";
import { Icon } from "react-native-elements";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../firebase.config";
import { initializeApp } from "firebase/app";
import { useToast } from "react-native-toast-notifications";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const ListTask = ({ tasks, setTasks }) => {
  const toast = useToast();
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks(tasks.filter((item) => item.id !== id));
      toast.show("Tudoit eliminado con exitó.", {
        type: "success",
        successColor: "#5d58d7",
        placement: "center",
        duration: 4000,
        offset: 30,
        animationType: "slide-in | zoom-in",
      });
    } catch (error) {
      toast.show("Fallo al intentar eliminat un Tudoit, intente más tarde.", {
        type: "danger",
        placement: "center",
        duration: 4000,
        offset: 50,
        animationType: "slide-in | zoom-in",
      });
    }
  };

  return (
    <View style={styles.listContain}>
      {tasks.map((item) => {
        return (
          <View style={styles.itemContain} key={item.id}>
            <View
              style={{
                width: "100%",
              }}
            >
              <View style={{ width: "90%" }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <View
                style={{
                  height: "100%",
                  position: "absolute",
                  right: 0,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  onPress={() => handleDelete(item.id)}
                  type="feather"
                  name="trash-2"
                  color={"#F99E4C"}
                />
              </View>
            </View>
            <Divider style={{ paddingBottom: 20 }} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  listContain: {
    padding: 20,
    width: "100%",
    height: "100%",
  },
  itemContain: {
    paddingVertical: 5,
  },
  title: {
    fontSize: 20,
    color: "#F99E4C",
  },
  description: {
    fontSize: 20,
    color: "#e4f5ff",
  },
});
