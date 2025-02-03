import {Platform, StyleSheet, View} from 'react-native';
import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {mS} from '@/utils/functions';
import {useTheme} from '@/hooks';

interface PROPS {
  children: any;
  onClose?: () => void;
}

export type sheetTypes = {
  show: () => void;
  hide: () => void;
};

const BottomSheetComponent = forwardRef(({children, onClose}: PROPS, ref) => {
  const {Colors} = useTheme();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  useImperativeHandle<any, sheetTypes>(ref, () => ({
    show: () => actionSheetRef.current?.show(),
    hide: () => actionSheetRef.current?.hide(),
  }));

  return (
    <ActionSheet
      ref={actionSheetRef}
      onClose={onClose}
      closeOnPressBack={false}
      containerStyle={{
        borderTopRightRadius: mS(30),
        borderTopLeftRadius: mS(30),
        overflow: 'hidden',
      }}>
      <View style={{backgroundColor: Colors.white}}>{children}</View>
      <View
        style={{
          height: mS(50),
          backgroundColor: Colors.white,
        }}
      />
    </ActionSheet>
  );
});

export default BottomSheetComponent;

const styles = StyleSheet.create({});
