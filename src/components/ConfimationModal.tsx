import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {useTheme} from '@/hooks';
import {mS, sWidth} from '@/utils/functions';
import {Colors} from '@/theme/Variables';

interface PROPS {
  title: string;
  children: any;
  BtnOnePress: () => void;
  BtnTwoPress?: () => void;
  firstBtnName?: string;
  secondBtnName?: string;
}
export type modalTypes = {
  show: () => void;
  hide: () => void;
};

const ConfimationModal = forwardRef<modalTypes, PROPS>(
  (
    {
      title,
      children,
      BtnOnePress,
      BtnTwoPress,
      firstBtnName = 'OK',
      secondBtnName = 'CANCEL',
    },
    ref,
  ) => {
    const {Layout, Gutters, Fonts, Colors} = useTheme();
    const [isModalVisible, setModalVisible] = useState(false);
    useImperativeHandle(ref, () => ({
      show() {
        setModalVisible(true);
      },
      hide() {
        setModalVisible(false);
      },
    }));

    return (
      <View>
        <Modal
          //   animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(!isModalVisible);
          }}>
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
              setModalVisible(!isModalVisible);
            }}
            style={[
              Layout.fill,
              Layout.center,
              {backgroundColor: 'rgba(0, 0, 0, 0.35)'},
            ]}>
            <View
              style={[
                {
                  backgroundColor: Colors.white,
                  width: sWidth(85),
                  borderRadius: mS(20),
                  overflow: 'hidden',
                },
              ]}>
              <Text
                style={[
                  Fonts.OpenSans30_Bold_111111,
                  Fonts.textCenter,
                  Gutters.regularTMargin,
                ]}>
                {title}
              </Text>

              <View
                style={[
                  Gutters.regularBMargin,
                  Gutters.xLittleTMargin,
                  Gutters.xLittleHMargin,
                ]}>
                {children}
              </View>
              <View style={[styles.rowBtn]}>
                <TouchableOpacity onPress={BtnOnePress} style={[styles.button]}>
                  <Text
                    style={[Fonts.OpenSans20_Bold_111111, Fonts.textCenter]}>
                    {firstBtnName}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    height: mS(72),
                    borderLeftWidth: 1,
                    borderColor: Colors.gray_DBDBDB,
                  }}
                />
                <TouchableOpacity onPress={BtnTwoPress} style={[styles.button]}>
                  <Text
                    style={[Fonts.OpenSans20_Bold_111111, Fonts.textCenter]}>
                    {secondBtnName}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Modal>
      </View>
    );
  },
);

export default ConfimationModal;
const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBtn: {
    flexDirection: 'row',
    height: mS(72),
    borderTopWidth: 1,
    borderTopColor: Colors.gray_DBDBDB,
  },
});
