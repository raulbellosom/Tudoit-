import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import { Icon, Divider } from "@rneui/themed";
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
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { ListTask } from "./components/ListTask";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function Main() {
  const [isAddTaks, setIsAddTaks] = useState(false);
  const [isNewTask, setIsNewTask] = useState(false);
  const [isAuth, setIsAuth] = useState(null);
  const [allTask, setAllTask] = useState(null);
  const [closeSesion, setCloseSesion] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState("");
  const toast = useToast();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
        setIsAuth(true);
        handleGetTask(user);
      } else {
        setIsAuth(false);
      }
    });
  }, [userData]);

  useEffect(() => {
    if (allTask !== null) {
      handleGetTask(userData);
    }
  }, [isNewTask === true]);

  const handleGetTask = async (user) => {
    const taskRef = collection(db, "tasks");
    const tasks = [];
    const q = query(
      taskRef,
      where("idUser", "==", user.uid),
      where("isCompleted", "==", false),
      orderBy("createdAt")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        isCompleted: doc.data().isCompleted,
        createdAt: doc.data().createdAt,
      });
    });
    if (allTask === null) {
      setAllTask(tasks);
    } else {
      tasks.forEach((object) => {
        if (allTask.find((item) => item.name === object.name)) {
          console.log("tarea ya existente");
        } else {
          setAllTask(tasks);
        }
      });
    }
  };

  const handleCreateAccount = (email, password) => {
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
        setIsAddTaks(false);
        setIsNewTask(false);
        setIsAuth(false);
        setAllTask(null);
        setCloseSesion(false);
        setShowProfile(false);
        setUserData("");
        toast.show("Se ha cerrado sesión correctamente.", {
          type: "success",
          successColor: "#5d58d7",
          placement: "center",
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

        {isAuth === null ? (
          <View style={[styles.spinnerContinare, styles.spinnerHorizontal]}>
            <ActivityIndicator size="large" color="#F99E4C" />
          </View>
        ) : (
          <>
            {allTask !== null && (
              <ScrollView>
                <ListTask tasks={allTask} setTasks={setAllTask} />
              </ScrollView>
            )}

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
              <View style={styles.profileContainer}>
                <User
                  user={userData}
                  logOut={handleLogOut}
                  close={setShowProfile}
                  updateData={handleUpdateData}
                />
              </View>
            )}

            {closeSesion && (
              <View style={styles.profileContainer}>
                <LogOut
                  user={userData}
                  logOut={handleLogOut}
                  close={setCloseSesion}
                />
              </View>
            )}

            {isAddTaks && (
              <View style={styles.profileContainer}>
                <CreateTask
                  user={userData}
                  isAddTaks={isAddTaks}
                  setIsAddTaks={setIsAddTaks}
                  isNewTask={isNewTask}
                  setIsNewTask={setIsNewTask}
                />
              </View>
            )}
          </>
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
  profileContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight + 50,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  spinnerContinare: {
    flex: 1,
    justifyContent: "center",
  },
  spinnerHorizontal: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
});
