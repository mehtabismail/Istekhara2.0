import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {useTheme} from '@/hooks';
import {hS, mS} from '@/utils/functions';

interface PROPS {
  step: number;
  isValid: boolean;
  data: {
    title: string;
    completed: boolean;
  }[];
  containerStyle?: StyleProp<ViewStyle>;
}

const StepsComponent = ({data, containerStyle, step, isValid}: PROPS) => {
  const {Gutters, Colors, Fonts, Layout} = useTheme();
  return (
    <View style={[Layout.rowCenter, Gutters.xLittleMargin, containerStyle]}>
      {data.map((item, index) => {
        return (
          <View key={index} style={[Layout.center, {marginHorizontal: 2}]}>
            <Text
              style={[
                Fonts.OpenSans14_Regular_DBDBDB,
                {
                  marginBottom: 7,
                  color:
                    index == step - 1 && isValid
                      ? Colors.white
                      : index == step - 1
                      ? Colors.gray_DBDBDB
                      : item?.completed
                      ? Colors.green_45A300
                      : Colors.gray_707070,
                },
              ]}>
              {item?.title}
            </Text>
            <View
              style={[
                styles.stepLine,
                {
                  backgroundColor:
                    index == step - 1 && isValid
                      ? Colors.green_45A300
                      : index == step - 1
                      ? Colors.gray_DBDBDB
                      : item?.completed
                      ? Colors.green_45A300
                      : Colors.gray_707070,
                },
              ]}
            />
          </View>
        );
      })}
    </View>
  );
};

export default StepsComponent;

const styles = StyleSheet.create({
  stepLine: {
    height: mS(8),
    width: hS(120),
  },
});
