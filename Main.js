import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Constants from "expo-constants";
import { Icon, Divider, CheckBox } from "@rneui/themed";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import { CreateTask } from "./components/CreateTask";
import { Auth } from "./Auth";
import { User } from "./components/User";
import { LogOut } from "./components/LogOut";
import { useToast } from "react-native-toast-notifications";

export default function Main() {
  const [isAddTaks, setIsAddTaks] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [closeSesion, setCloseSesion] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState("");
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const toast = useToast();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
        setIsAuth(true);
      }
    });
  }, [userData]);

  const handleCreateAccount = (email, password) => {
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserData(userCredential.user);
        setIsAuth(true);
        toast.show("Registro completado con exito.", {
          type: "success",
          successColor: "#5d58d7",
          placement: "center",
          duration: 4000,
          offset: 30,
          animationType: "slide-in | zoom-in",
        });
      })
      .catch((error) => {
        toast.show(
          "No se ha podidó completar el registro, intentelo más tarde.",
          {
            type: "danger",
            placement: "center",
            duration: 4000,
            offset: 50,
            animationType: "slide-in | zoom-in",
          }
        );
      });
  };
  const handleSingIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserData(userCredential.user);
        setIsAuth(true);
        toast.show("Inicio de sesión exitoso.", {
          type: "success",
          successColor: "#5d58d7",
          placement: "center",
          duration: 4000,
          animationType: "slide-in | zoom-in",
        });
      })
      .catch((error) => {
        toast.show("Correo electrónico y/o contraseña incorrectos.", {
          type: "danger",
          placement: "center",
          duration: 4000,
          offset: 50,
          animationType: "slide-in | zoom-in",
        });
      });
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setIsAuth(false);
        setCloseSesion(false);
        setIsAddTaks(false);
        setShowProfile(false);
        toast.show("Se ha cerrado sesión correctamente.", {
          type: "success",
          successColor: "#5d58d7",
          placement: "top",
          duration: 4000,
          animationType: "slide-in | zoom-in",
        });
      })
      .catch((error) => {
        toast.show("Fallo al intentar cerrar sesión, intente más tarde.", {
          type: "danger",
          placement: "center",
          duration: 4000,
          offset: 50,
          animationType: "slide-in | zoom-in",
        });
      });
  };

  const handleUpdateData = (type, data) => {
    switch (type) {
      case "name":
        updateProfile(auth.currentUser, {
          displayName: data,
        })
          .then(() => {
            toast.show("Nombre actualizado con exitó.", {
              type: "success",
              successColor: "#5d58d7",
              placement: "center",
              duration: 4000,
              offset: 30,
              animationType: "slide-in | zoom-in",
            });
          })
          .catch((error) => {
            toast.show(
              "El nombre no pudo ser actualizado, intente más tarde.",
              {
                type: "danger",
                placement: "center",
                duration: 4000,
                offset: 50,
                animationType: "slide-in | zoom-in",
              }
            );
          });
        break;
      case "email":
        updateEmail(auth.currentUser, data)
          .then(() => {
            toast.show("Correo electrónico actualizado con exitó.", {
              type: "success",
              successColor: "#5d58d7",
              placement: "center",
              duration: 4000,
              offset: 30,
              animationType: "slide-in | zoom-in",
            });
          })
          .catch((error) => {
            toast.show(
              "El correo electrónico no pudo ser actualizado, intente más tarde.",
              {
                type: "danger",
                placement: "center",
                duration: 4000,
                offset: 50,
                animationType: "slide-in | zoom-in",
              }
            );
          });
        break;
      case "pass":
        console.log(data);
        const user = auth.currentUser;
        updatePassword(user, data)
          .then(() => {
            toast.show("Contraseña actualizada con exitó.", {
              type: "success",
              successColor: "#5d58d7",
              placement: "center",
              duration: 4000,
              offset: 30,
              animationType: "slide-in | zoom-in",
            });
          })
          .catch((error) => {
            toast.show(
              "La contraseña no ha sido actualizada, intente más tarde.",
              {
                type: "danger",
                placement: "center",
                duration: 4000,
                offset: 50,
                animationType: "slide-in | zoom-in",
              }
            );
          });
        break;
      default:
        break;
    }
  };

  const openViews = (type) => {
    if (type === "profile") {
      setShowProfile(true);
      setCloseSesion(false);
      setIsAddTaks(false);
    } else if (type === "task") {
      setShowProfile(false);
      setCloseSesion(false);
      setIsAddTaks(true);
    } else if (type === "close") {
      setCloseSesion(true);
      setIsAddTaks(false);
      setShowProfile(false);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View>
          <View style={styles.logoContainer}>
            <Text style={styles.mainText}>Tud</Text>
            <Icon
              name="add-task"
              type="material-icons"
              size={35}
              color={"#F99E4C"}
            />
            <Text style={styles.mainText}>it!</Text>
          </View>
          <Text style={styles.regularText}>Planea ahora, haz lo despues! </Text>
        </View>
        <Divider style={{ paddingBottom: 20 }} />
        {!isAuth && (
          <View>
            <Auth register={handleCreateAccount} login={handleSingIn} />
          </View>
        )}

        {isAuth && (
          <View style={styles.btnProfile}>
            <Icon
              reverse
              name="user-circle"
              type="font-awesome-5"
              size={20}
              color={"#F99E4C"}
              onPress={() => {
                openViews("profile");
              }}
            />
          </View>
        )}

        {isAuth && (
          <View style={styles.btnClose}>
            <Icon
              reverse
              name="logout"
              type="ant-design"
              size={20}
              color={"#F99E4C"}
              onPress={() => {
                openViews("close");
              }}
            />
          </View>
        )}
        {isAuth && (
          <View style={styles.btnAdd}>
            <Icon
              onPress={() => {
                openViews("task");
              }}
              raised
              name="plus"
              type="font-awesome"
              color="#F99E4C"
            />
          </View>
        )}

        {showProfile && (
          <View style={styles.profile}>
            <User
              user={userData}
              logOut={handleLogOut}
              close={setShowProfile}
              updateData={handleUpdateData}
            />
          </View>
        )}

        {closeSesion && (
          <View style={styles.profile}>
            <LogOut
              user={userData}
              logOut={handleLogOut}
              close={setCloseSesion}
            />
          </View>
        )}

        {isAddTaks && (
          <View style={styles.taskContainer}>
            <CreateTask isAddTaks={isAddTaks} setIsAddTaks={setIsAddTaks} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#494D5F",
    // backgroundColor: "#5d58d7",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  logoContainer: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    textAlign: "center",
    fontSize: 40,
    color: "#e4f5ff",
    fontWeight: "bold",
  },
  regularText: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
    color: "#e4f5ff",
    paddingTop: 0,
    paddingBottom: 5,
  },
  btnAdd: {
    padding: 0,
    borderRadius: "50%",
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 75,
    right: 40,
  },
  taskContainer: {
    position: "absolute",
    top: 125,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2.5,
  },
  btnProfile: {
    position: "absolute",
    paddingTop: Constants.statusBarHeight,
    left: 10,
  },
  btnClose: {
    position: "absolute",
    paddingTop: Constants.statusBarHeight,
    right: 10,
  },
});

{
  /* <CheckBox
          containerStyle={{ backgroundColor: "#494D5F" }}
          textStyle={{ color: "white" }}
          title="Tarea tres"
          checked={check1}
          onPress={() => setCheck1(!check1)}
        />
        <Divider /> */
}
