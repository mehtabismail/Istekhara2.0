import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {mS} from '@/utils/functions';
import {useTheme} from '@/hooks';

const TaskBox = ({title, onPress, status}) => {
  const {Gutters, Layout, Colors, Images, Fonts} = useTheme();
  return (
    <View
      style={[
        Layout.rowHCenter,
        {
          marginHorizontal: mS(10),
          marginVertical: mS(5),
          backgroundColor: Colors.white,
          borderColor: Colors.gray_F2F2F2,
          borderWidth: mS(1.5),
          borderRadius: mS(25),
        },
      ]}>
      <View
        style={[
          Layout.fill,
          Layout.row,
          Layout.center,
          Layout.justifyContentBetween,
        ]}>
        <View
          style={[
            {
              width: '75%',
              paddingHorizontal: mS(15),
              paddingVertical: mS(20),
            },
          ]}>
          <Text>{title}</Text>
        </View>
      </View>
      <View style={[{width: '20%'}]}>
        <TouchableOpacity
          onPress={onPress}
          disabled={status == 'completed'}
          style={[
            Layout.center,
            Layout.selfEnd,
            {
              height: mS(44),
              width: mS(44),
              backgroundColor:
                status == 'completed'
                  ? Colors.green_45A300
                  : Colors.yellowPrimary_FFF0BF,
              borderRadius: mS(22),
            },
          ]}>
          <Images.svgIcon.checkIconBold
            width={mS(20)}
            height={mS(20)}
            fill={status == 'completed' ? 'white' : Colors.blackPrimary_111111}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskBox;
