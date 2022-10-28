import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import { validateEmail } from "../utils/validations";

export const Login = ({ isLogin, setIsLogin, login }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLoginUser = () => {
    if (!email.length) {
      setErrors("El correo electrónico es obligatorio");
      setIsError(true);
    } else if (!validateEmail(email)) {
      setErrors("Ingrese un email valido");
      setIsError(true);
    } else if (password.length < 8) {
      setErrors("Se requiere una contraseña de minimo 8 caracteres");
      setIsError(true);
    } else {
      setIsError(false);
      setErrors("");
      login(email, password);
    }
  };
  {
    return (
      <ScrollView style={{ height: "100%" }}>
        <View>
          <View style={styles.loginForm}>
            <View style={{ paddingTop: 10, paddingBottom: 30 }}>
              <Text style={styles.title}>Inicia sesión</Text>
              <Text style={styles.regularText}>
                Ingresa tus datos para acceder a tus Tudoits
              </Text>
            </View>
            <Text style={styles.textLogin}>Correo electronico</Text>
            <Input
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholder="Correo electronico"
            />
            <Text style={styles.textLogin}>Contraseña</Text>
            <Input
              onChangeText={(text) => setPassword(text)}
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
              style={styles.input}
              rightIcon={
                <Icon
                  name={showPassword ? "eye-off" : "eye"}
                  type="feather"
                  size={24}
                  color="#e4f5ff"
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

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                paddingTop: 10,
              }}
            >
              <Button
                title="Iniciar sesión"
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
                  handleLoginUser();
                }}
              />
            </View>
            <View style={styles.register}>
              <Text style={styles.regularText}>¿Aun no tienes una cuenta?</Text>
              <Text
                onPress={() => {
                  setIsLogin(!isLogin);
                }}
                style={styles.title}
              >
                Registrate aqui
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#F99E4C",
    padding: 10,
    fontSize: 18,
  },
  regularText: {
    textAlign: "center",
    fontSize: 15,
    color: "#e4f5ff",
    paddingTop: 0,
    paddingBottom: 5,
  },
  loginForm: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  input: {
    color: "#e4f5ff",
    maxWidth: 300,
  },
  textLogin: {
    textAlign: "left",
    fontSize: 15,
    color: "#e4f5ff",
    paddingLeft: 20,
  },
  register: {
    paddingVertical: 30,
  },
  error: {
    fontSize: 16,
    color: "#E53860",
    paddingVertical: 5,
  },
});
