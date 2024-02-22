import "react-native-gesture-handler";
import { Provider } from "react-redux";

import CounterController from "@/components/counter";
import AppNavigation from "@/navigation";
import store from "@/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
      <CounterController />
    </Provider>
  );
}
