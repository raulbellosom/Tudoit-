import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

export const Auth = ({ register, login }) => {
  const [isLogin, setIsLogin] = useState(true);
  {
    return (
      <View>
        {isLogin ? (
          <Login isLogin={isLogin} setIsLogin={setIsLogin} login={login} />
        ) : (
          <Register
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            register={register}
          />
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({});
