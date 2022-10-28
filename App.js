import { LogBox } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import Main from "./Main";
LogBox.ignoreLogs(["Async Storage has been extracted from react-native core"]);
export default function App() {
  return (
    <ToastProvider>
      <Main />
    </ToastProvider>
  );
}

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
