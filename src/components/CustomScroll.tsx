import {
  Keyboard,
  Pressable,
  RefreshControlProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface PROPS {
  contentContainerStyle?: StyleProp<ViewStyle>;
  children: any;
  refreshControl?:
    | React.ReactElement<
        RefreshControlProps,
        string | React.JSXElementConstructor<any>
      >
    | undefined;
}
const CustomScroll = ({
  children,
  contentContainerStyle,
  refreshControl,
}: PROPS) => {
  return (
    <KeyboardAwareScrollView
      refreshControl={refreshControl}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={[{flexGrow: 1}]}>
      <Pressable
        onPress={() => Keyboard.dismiss()}
        style={[{flex: 1}, contentContainerStyle]}>
        {children}
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default CustomScroll;

const styles = StyleSheet.create({});
