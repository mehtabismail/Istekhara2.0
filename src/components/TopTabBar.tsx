import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';

interface PROPS {
  showBottomBorder?: boolean;
  touchDisabled?: boolean;
  tabsList: {
    label: string;
    value: string;
  }[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  step?: number;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  onPress?: any;
}

const TopTabBar = ({
  touchDisabled,
  selected,
  setSelected,
  step,
  setStep,
  tabsList,
  showBottomBorder,
  onPress,
}: PROPS) => {
  const {Layout, Gutters, Colors, Fonts} = useTheme();
  return (
    <View
      style={[
        Layout.rowHCenter,
        Gutters.smallVPadding,
        Gutters.regularHPadding,
        showBottomBorder && {
          borderBottomColor: Colors.gray_F2F2F2,
          borderBottomWidth: mS(1.5),
        },
      ]}>
      {tabsList?.map((item, index) => {
        return (
          <TouchableOpacity
            disabled={touchDisabled}
            key={index}
            onPress={() => {
              if (onPress) {
                onPress(item?.value, index);
              } else {
                setSelected(item?.value);
                setStep && setStep(index);
              }
            }}
            style={[
              Layout.fill,
              styles.itemContainer,
              Layout.center,

              {
                borderBottomColor:
                  step > index
                    ? Colors.green_45A300
                    : selected == item.value
                    ? Colors.blackPrimary_111111
                    : Colors.gray_DBDBDB,
              },
            ]}>
            <Text
              style={[
                item?.value == selected
                  ? Fonts.OpenSans14_Bold_DBDBDB
                  : Fonts.OpenSans12_Bold_111111,
                {
                  color:
                    step > index
                      ? Colors.green_45A300
                      : item?.value == selected
                      ? Colors.blackPrimary_111111
                      : Colors.gray_DBDBDB,
                  marginBottom: item?.value == selected ? mS(4) : mS(5),
                  marginTop: item?.value == selected ? mS(0) : mS(2),
                },
              ]}>
              {item?.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TopTabBar;

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: mS(6),
    marginHorizontal: mS(1),
  },
});
