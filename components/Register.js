import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateEmail } from "../utils/validations";

export const Register = ({ isLogin, setIsLogin, register }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [isError, setIsError] = useState(false);

  const handleCreateUser = () => {
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
      if (password !== repeatPassword) {
        setErrors("Las contraseñas no son iguales");
        setIsError(true);
      } else {
        setIsError(false);
        setErrors("");
        register(email, password);
      }
    }
  };

  {
    return (
      <KeyboardAwareScrollView>
        <View>
          <View style={styles.loginForm}>
            <View style={{ paddingTop: 10, paddingBottom: 30 }}>
              <Text style={styles.title}>Registrate</Text>
              <Text style={styles.regularText}>
                Crea una cuenta para comenzar a programar tus Tudoits
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
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
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
            <Text style={styles.textLogin}>Repetir Contraseña</Text>
            <Input
              placeholder="Repetir contraseña"
              secureTextEntry={!showPassword}
              onChangeText={(text) => setRepeatPassword(text)}
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
                title="Registrarse"
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
                  width: 150,
                }}
                onPress={() => {
                  handleCreateUser();
                }}
              />
            </View>
            <View style={styles.register}>
              <Text style={styles.regularText}>¿Ya tienes una cuenta?</Text>
              <Text
                onPress={() => {
                  setIsLogin(!isLogin);
                }}
                style={styles.title}
              >
                Inicia sesión aquí
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
    color: "white",
    color: "#F99E4C",
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
