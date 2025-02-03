import fonts from '@/theme/assets/fonts';
import {Colors} from '@/theme/Variables';
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
  ToastShowParams,
} from 'react-native-toast-message';
import {mS} from './functions';
import {Platform} from 'react-native';

export const toastConfig: ToastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        marginTop: Platform.OS == 'ios' ? mS(15) : 0,
        borderLeftColor: Colors.green_45A300,
        backgroundColor: Colors.white,
        borderRadius: mS(15),
      }}
      text1Style={{
        color: Colors.black,
        fontFamily: fonts.OpenSansSemiBold,
        fontSize: 14,
      }}
      text2Style={{
        color: Colors.blackPrimary_111111,
        fontFamily: fonts.OpenSansSemiBold,
        fontSize: 12,
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{
        marginTop: Platform.OS == 'ios' ? mS(15) : 0,
        borderLeftColor: Colors.red_FF0000,
        backgroundColor: Colors.white,
        borderRadius: mS(15),
      }}
      text1Style={{
        color: Colors.black,
        fontFamily: fonts.OpenSansSemiBold,
        fontSize: 14,
      }}
      text2Style={{
        color: Colors.blackPrimary_111111,
        fontFamily: fonts.OpenSansSemiBold,
        fontSize: 12,
      }}
    />
  ),
  default: props => (
    <BaseToast
      {...props}
      style={{
        marginTop: Platform.OS == 'ios' ? mS(15) : 0,
        borderLeftColor: Colors.gray_707070,
        backgroundColor: Colors.white,
        borderRadius: mS(15),
      }}
      text1Style={{
        color: Colors.black,
        fontFamily: fonts.OpenSansSemiBold,
        fontSize: 14,
      }}
      text2Style={{
        color: Colors.blackPrimary_111111,
        fontFamily: fonts.OpenSansSemiBold,
        fontSize: 12,
      }}
    />
  ),
};

type Toast = {
  (message: string, message2?: string, params?: ToastShowParams): void;
  success(message: string, message2?: string, params?: ToastShowParams): void;
  error(message: string, message2?: string, params?: ToastShowParams): void;
};

export const toast: Toast = (message, message2, params = {}) =>
  Toast.show({type: 'default', text1: message, text2: message2, ...params});

toast.success = (message, message2, params = {}) =>
  Toast.show({type: 'success', text1: message, text2: message2, ...params});

toast.error = (message, message2, params = {}) =>
  Toast.show({type: 'error', text1: message, text2: message2, ...params});
