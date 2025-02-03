import {Image, StyleProp, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ViewStyle} from 'react-native-size-matters';
import {useTheme} from '@/hooks';
import {mS} from '@/utils/functions';

interface PROPS {
  size: number;
  src?: string;
  alt?: string;
  backgroundColor?: string;
  showOnlineStatus?: boolean;
  isOnline?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Avatar = ({
  size = 61,
  alt,
  isOnline,
  src,
  style,
  showOnlineStatus,
  backgroundColor,
}: PROPS) => {
  const {Layout, Colors, Fonts} = useTheme();

  const getAbbreviation = () => {
    const words: any = alt?.trim()?.split(' ');
    let abbreviation = words
      .filter((word: string) => word.length > 0)
      .slice(0, 2)
      .map((word: string) => word[0].toUpperCase())
      .join('');
    return abbreviation;
  };

  const calculateProportionalValue = (input: number) => {
    const minInput = 30;
    const maxInput = 90;
    const minOutput = 0;
    const maxOutput = 8;
    const output =
      ((input - minInput) / (maxInput - minInput)) * (maxOutput - minOutput) +
      minOutput;
    return output;
  };

  return (
    <View style={{alignSelf: 'center'}}>
      {showOnlineStatus && (
        <View
          style={{
            height: mS(12),
            width: mS(12),
            backgroundColor: isOnline
              ? Colors.green_45A300
              : Colors.gray_9D9D9D,
            borderRadius: mS(6),
            position: 'absolute',
            top: mS(calculateProportionalValue(size)),
            right: mS(calculateProportionalValue(size)),
            zIndex: 2,
          }}
        />
      )}
      <View
        style={[
          Layout.center,
          {
            height: mS(size),
            width: mS(size),
            backgroundColor: backgroundColor || Colors.gray_DBDBDB,
            borderRadius: size / 2,
            overflow: 'hidden',
          },
        ]}>
        {src ? (
          <Image
            source={{uri: src}}
            resizeMode="contain"
            style={{height: mS(size), width: mS(size)}}
          />
        ) : alt ? (
          <Text style={[Fonts.OpenSans15_Bold_111111]}>
            {getAbbreviation()}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({});
