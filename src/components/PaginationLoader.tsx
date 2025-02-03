import {useTheme} from '@/hooks';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
interface PROPS {
  height: number;
  loading: boolean;
}

const PaginationLoader = ({height, loading}: PROPS) => {
  const {Layout, Colors} = useTheme();
  return (
    <View
      style={[
        Layout.justifyContentCenter,
        Layout.alignItemsCenter,
        {
          height: height,
        },
      ]}>
      {loading && (
        <ActivityIndicator color={Colors.blackPrimary_111111} size={'large'} />
      )}
    </View>
  );
};

export default PaginationLoader;
