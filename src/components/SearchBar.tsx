import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {mS} from '@/utils/functions';
import {useTheme} from '@/hooks';

interface PROPS {
  placeholder?: string;
  searchTxt: string;
  filterDisabled?: boolean;
  reverse: boolean;
  setSearchTxt: React.Dispatch<React.SetStateAction<string>>;
  onFilterPress: () => void;
}

const SearchBar = ({
  searchTxt,
  setSearchTxt,
  reverse,
  onFilterPress,
  filterDisabled,
  placeholder = 'Search...',
}: PROPS) => {
  const {Colors, Images, Layout, Fonts, Gutters} = useTheme();

  return (
    <View
      style={[
        Layout.row,
        {
          height: mS(55),
          backgroundColor: Colors.gray_FAFAFA,
          borderBottomColor: Colors.gray_F2F2F2,
          borderBottomWidth: mS(1),
        },
      ]}>
      <TextInput
        value={searchTxt}
        onChangeText={setSearchTxt}
        placeholder={placeholder}
        placeholderTextColor={Colors.blackPrimary_111111}
        style={[
          Layout.fill,
          Fonts.OpenSans14_Regular_DBDBDB,
          Gutters.xSmallHPadding,
          {color: Colors.blackPrimary_111111},
        ]}
      />
      <TouchableOpacity
        disabled={filterDisabled}
        onPress={onFilterPress}
        style={[
          Layout.center,
          {width: mS(73), height: mS(55), backgroundColor: Colors.gray_F2F2F2},
          {transform: [{scaleX: reverse ? -1 : 1}]},
        ]}>
        <Images.svgIcon.menuFilter width={mS(23.6)} height={mS(19)} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
