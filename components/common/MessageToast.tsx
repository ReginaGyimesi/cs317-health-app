import Toast from "react-native-root-toast";
import { StyleSheet } from "react-native";
import { Colors } from "../../styles";

export enum ToastType {
  SUCCESS,
  FAILURE,
  WARNING,
}

export const showToast = (message: string, type: ToastType) => {
  Toast.show(message, {
    duration: 1000,
    containerStyle:
      (type === ToastType.SUCCESS && styles.successToast) ||
      (type === ToastType.FAILURE && styles.failedToast) ||
      (type === ToastType.WARNING && styles.warnToast),
    opacity: 1,
  });
};

const styles = StyleSheet.create({
  failedToast: {
    backgroundColor: Colors.dangerRed,
    opacity: 1,
    borderRadius: 5,
    padding: 10,
  },
  successToast: {
    backgroundColor: Colors.acceptGreen,
    opacity: 1,
    borderRadius: 5,
    padding: 10,
  },
  warnToast: {
    backgroundColor: Colors.warningYellow,
    opacity: 1,
    borderRadius: 5,
    padding: 10,
  },
});
