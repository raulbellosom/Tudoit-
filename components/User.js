import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import { validateEmail } from "../utils/validations";

export const User = ({ user, close, updateData }) => {
  const { displayName, email } = user;
  const [newEmail, setNewEmail] = useState(email);
  const [newName, setNewName] = useState(displayName);
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [changeName, setChangeName] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const [errors, setErrors] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleType = (type) => {
    switch (type) {
      case "name":
        setChangeName(true);
        setChangeEmail(false);
        setChangePass(false);
        break;
      case "email":
        setChangeEmail(true);
        setChangeName(false);
        setChangePass(false);
        break;
      case "pass":
        setChangePass(true);
        setChangeEmail(false);
        setChangeName(false);
        break;
      case "cancel":
        setChangePass(false);
        setChangeEmail(false);
        setChangeName(false);
        setShowPassword(false);
        setIsError(false);
        setErrors("");
      default:
        break;
    }
  };

  const handleUpdate = (type) => {
    switch (type) {
      case "email":
        if (newEmail === email) {
          setErrors("El email nuevo no puede ser igual al actual");
          setIsError(true);
        } else if (!validateEmail(email)) {
          setErrors("Ingrese un email valido");
          setIsError(true);
        } else {
          updateData(type, newEmail);
          setIsError(false);
          setErrors("");
          handleType("cancel");
          close(false);
        }
        break;
      case "name":
        if (newName === displayName) {
          setErrors("El nombre nuevo no puede ser igual al actual");
          setIsError(true);
        } else {
          updateData(type, newName);
          setIsError(false);
          setErrors("");
          handleType("cancel");
          close(false);
        }
        break;
      case "pass":
        if (newPass.length < 8) {
          setErrors("Se requiere una contraseña de minimo 8 caracteres");
          setIsError(true);
        } else {
          if (newPass !== repeatPass) {
            setErrors("Las contraseñas no son iguales");
            setIsError(true);
          } else {
            setIsError(false);
            setErrors("");
            handleType("cancel");
            close(false);
            updateData(type, newPass);
          }
        }
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi información</Text>
      {!changeEmail && !changeName && !changePass && (
        <View>
          <View style={styles.fields}>
            <Text style={styles.regularText}>Nombre: </Text>
            <View style={styles.edit}>
              <Text style={styles.user}>{displayName ?? "User"}</Text>
              <Icon
                onPress={() => {
                  handleType("name");
                }}
                name="edit"
                type="ant-design"
                color="#F99E4C"
              />
            </View>
          </View>
          <View style={styles.fields}>
            <Text style={styles.regularText}>Correo electrónico: </Text>
            <View style={styles.edit}>
              <Text style={styles.user}>{email ?? "email"}</Text>
              <Icon
                onPress={() => {
                  handleType("email");
                }}
                name="edit"
                type="ant-design"
                color="#F99E4C"
              />
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 30,
            }}
          >
            <Button
              title="Actualizar contraseña"
              iconRight
              icon={{
                name: "lock",
                type: "simple-line-icons",
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
                width: 220,
              }}
              onPress={() => {
                handleType("pass");
              }}
            />
          </View>
        </View>
      )}

      {changeEmail && (
        <View>
          <Text style={styles.textLogin}>Correo electrónico</Text>
          <Input
            onChangeText={(text) => setNewEmail(text)}
            style={styles.input}
            placeholder="Correo electrónico"
            rightIcon={
              <Icon name={"edit"} type="ant-design" size={24} color="#494D5F" />
            }
          />
          {isError && <Text style={styles.error}>{errors}</Text>}
          <View style={{ alignItems: "center", paddingTop: 10 }}>
            <Button
              title="Actualizar"
              iconRight
              icon={{
                name: "checkcircleo",
                type: "ant-design",
                size: 20,
                color: "white",
              }}
              buttonStyle={{
                backgroundColor: "#F99E4C",
                borderColor: "#F99E4C",
                borderWidth: 4,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 220,
                paddingBottom: 20,
              }}
              onPress={() => {
                handleUpdate("email");
              }}
            />
            <Button
              title="Cancelar"
              iconRight
              icon={{
                name: "leftcircleo",
                type: "ant-design",
                size: 20,
                color: "#F99E4C",
              }}
              type="outline"
              buttonStyle={{
                backgroundColor: "#e4f5ff",
                borderWidth: 4,
                borderRadius: 30,
                color: "#F99E4C",
                borderColor: "#F99E4C",
              }}
              titleStyle={{ color: "#F99E4C", fontWeight: "bold" }}
              containerStyle={{
                width: 220,
              }}
              onPress={() => {
                handleType("cancel");
              }}
            />
          </View>
        </View>
      )}

      {changeName && (
        <View>
          <Text style={styles.textLogin}>Cambiar nombre</Text>
          <Input
            onChangeText={(text) => setNewName(text)}
            style={styles.input}
            placeholder="Nombre"
            rightIcon={
              <Icon name={"edit"} type="ant-design" size={24} color="#494D5F" />
            }
          />
          {isError && <Text style={styles.error}>{errors}</Text>}
          <View style={{ alignItems: "center", paddingTop: 10 }}>
            <Button
              title="Actualizar"
              iconRight
              icon={{
                name: "checkcircleo",
                type: "ant-design",
                size: 20,
                color: "white",
              }}
              buttonStyle={{
                backgroundColor: "#F99E4C",
                borderColor: "#F99E4C",
                borderWidth: 4,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 220,
                paddingBottom: 20,
              }}
              onPress={() => {
                handleUpdate("name");
              }}
            />
            <Button
              title="Cancelar"
              iconRight
              icon={{
                name: "leftcircleo",
                type: "ant-design",
                size: 20,
                color: "#F99E4C",
              }}
              type="outline"
              buttonStyle={{
                backgroundColor: "#e4f5ff",
                borderWidth: 4,
                borderRadius: 30,
                color: "#F99E4C",
                borderColor: "#F99E4C",
              }}
              titleStyle={{ color: "#F99E4C", fontWeight: "bold" }}
              containerStyle={{
                width: 220,
              }}
              onPress={() => {
                handleType("cancel");
              }}
            />
          </View>
        </View>
      )}

      {changePass && (
        <ScrollView>
          <Text style={styles.textLogin}>Cambiar contraseña</Text>
          <Input
            onChangeText={(text) => setNewPass(text)}
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            rightIcon={
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                type="feather"
                size={24}
                color="#F99E4C"
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
              />
            }
          />
          <Text style={styles.textLogin}>Repetir contraseña</Text>
          <Input
            onChangeText={(text) => setRepeatPass(text)}
            style={styles.input}
            secureTextEntry={!showPassword}
            placeholder="Repetir contraseña"
            rightIcon={
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                type="feather"
                size={24}
                color="#F99E4C"
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
              />
            }
          />
          {isError && (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Icon type="ant-design" name="warning" color={"#E53860"} />
              <Text style={styles.error}> {errors}</Text>
            </View>
          )}
          <View style={{ alignItems: "center", paddingTop: 10 }}>
            <Button
              title="Actualizar"
              iconRight
              icon={{
                name: "checkcircleo",
                type: "ant-design",
                size: 20,
                color: "white",
              }}
              buttonStyle={{
                backgroundColor: "#F99E4C",
                borderColor: "#F99E4C",
                borderWidth: 4,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 220,
                paddingBottom: 20,
              }}
              onPress={() => {
                handleUpdate("pass");
              }}
            />
            <Button
              title="Cancelar"
              iconRight
              icon={{
                name: "leftcircleo",
                type: "ant-design",
                size: 20,
                color: "#F99E4C",
              }}
              type="outline"
              buttonStyle={{
                backgroundColor: "#e4f5ff",
                borderWidth: 4,
                borderRadius: 30,
                color: "#F99E4C",
                borderColor: "#F99E4C",
              }}
              titleStyle={{ color: "#F99E4C", fontWeight: "bold" }}
              containerStyle={{
                width: 220,
              }}
              onPress={() => {
                handleType("cancel");
              }}
            />
          </View>
        </ScrollView>
      )}

      <View style={styles.iconClose}>
        <Icon
          onPress={() => {
            close(false);
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
    maxHeight: 475,
  },
  regularText: {
    fontSize: 20,
    color: "white",
    color: "#F99E4C",
    paddingTop: 0,
    paddingBottom: 5,
    fontWeight: "bold",
  },
  fields: {
    paddingVertical: 10,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#F99E4C",
    padding: 10,
    fontSize: 22,
  },
  iconClose: {
    position: "absolute",
    padding: 5,
    paddingRight: 10,
    right: 0,
  },
  user: {
    fontSize: 18,
  },
  edit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textLogin: {
    textAlign: "left",
    fontSize: 20,
    color: "#494D5F",
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  error: {
    fontSize: 16,
    color: "#E53860",
    paddingVertical: 5,
  },
});
