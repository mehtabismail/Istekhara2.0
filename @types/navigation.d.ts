import {NavigatorScreenParams} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

// export type MainParamsList = {
//   Home: undefined;
// };

export type ApplicationStackParamList = {
  AuthNavigator: NavigatorScreenParams<AuthNavigatorParamList>;
  // Startup: undefined;
};

// export type ApplicationScreenProps =
//   StackScreenProps<ApplicationStackParamList>;

// Auth Navigator
export type AuthNavigatorParamList = {
  CongratulationsScreen: {
    heading: string;
    subHeading: string;
    buttonText: string;
    buttonAction: () => void;
  };
  LoginCreatePasswordScreen: undefined;
  LoginScreen: undefined;
  LoginWithPinScreen: undefined;
  OtpScreen: {
    email: string;
  };
  ResetPasswordEmailScreen: undefined;
  ResetPasswordNewPasswordScreen: {
    code: string;
  };
  ResetPinEmailScreen: undefined;
};
// Auth Screens
export type AuthScreenProps = StackScreenProps<AuthNavigatorParamList>;
