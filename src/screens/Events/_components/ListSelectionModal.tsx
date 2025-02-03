import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useTheme} from '@/hooks';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button';
import SearchBar from '../../../components/SearchBar';
import {mS} from '@/utils/functions';
import {FlashList} from '@shopify/flash-list';
import Checkbox from '../../../components/Checkbox';
import EmptyListComponent from '../../../components/EmptyListComponent';
import {DATA} from './AddTeams';
import {toast, toastConfig} from '@/utils/toast';
import Toast from 'react-native-toast-message';

interface PROPS {
  onPress: () => void;
  onSubmit?: () => void;
  btnTitle?: string;
  data: any;
  listData: any[];
  listIndex: number;
  errorMsg: string;
  setData: React.Dispatch<React.SetStateAction<DATA>>;
}
export type listModalType = {
  show: () => void;
  hide: () => void;
};

const ListSelectionModal = forwardRef<listModalType, PROPS>(
  (
    {onPress, btnTitle, listData, listIndex, data, setData, onSubmit, errorMsg},
    ref,
  ) => {
    const {Layout, Gutters, Fonts, Colors} = useTheme();
    const [isModalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [checked, setChecked] = React.useState(true);

    useImperativeHandle(ref, () => ({
      show() {
        setModalVisible(true);
      },
      hide() {
        setModalVisible(false);
      },
    }));

    const filteredData = listData?.filter(
      item =>
        `${item.first_name} ${item.last_name}`
          ?.toLowerCase()
          ?.includes(search?.toLowerCase()) ||
        item?.email?.toLowerCase()?.includes(search?.toLowerCase()),
    );

    const handlePress = (item: any) => {
      if (listIndex !== null) {
        setData(prevData =>
          prevData.map((event, index) => {
            if (index === listIndex) {
              const isAlreadyMember = event?.members?.some(
                m => m?._id === item?._id,
              );
              if (
                event?.members?.length >= data[listIndex]?.limit &&
                !isAlreadyMember
              ) {
                toast.error(
                  errorMsg ||
                    `You can only add up to ${data[listIndex]?.limit} members for this team.`,
                );
                return event;
              }
              return {
                ...event,
                members: isAlreadyMember
                  ? event.members.filter(m => m._id !== item._id)
                  : [...event.members, item],
              };
            }
            return event;
          }),
        );
      }
    };

    return (
      <Modal
        visible={isModalVisible}
        style={[Layout.fill]}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}>
        <View
          style={[
            Layout.fill,
            Gutters.regularHPadding,
            Platform.OS == 'ios'
              ? Gutters.extraLargeTPadding
              : Gutters.smallTPadding,
          ]}>
          <TextInput
            placeholder="Search..."
            placeholderTextColor={Colors.gray_9D9D9D}
            value={search}
            onChangeText={text => setSearch(text)}
            style={[
              Fonts.OpenSans16_Regular_white,
              Gutters.smallHPadding,
              Platform.OS == 'ios' && Gutters.smallTMargin,
              Layout.rowHCenter,
              {
                color: Colors.blackPrimary_111111,
                borderRadius: mS(15),
                borderColor: Colors.gray_DBDBDB,
                borderWidth: mS(1),
                paddingVertical: mS(15),
              },
            ]}
          />
          <FlashList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <EmptyListComponent />}
            estimatedItemSize={mS(50)}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => handlePress(item)}
                  style={[Layout.rowHCenter, Gutters.littleVMargin]}>
                  <Checkbox
                    status={
                      data[listIndex]?.members?.some(m => m._id === item._id)
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handlePress(item)}
                    containerStyle={[Gutters.littleRMargin]}
                  />
                  <Text
                    style={[
                      Fonts.OpenSans16_Regular_white,
                      {color: Colors.gray_707070},
                    ]}>
                    {item?.first_name} {item?.last_name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <Button
            title="Select"
            onPress={() => {
              setModalVisible(false);
              onSubmit && onSubmit();
            }}
            containerStyle={[
              Gutters.littleTMargin,
              Platform.OS == 'ios'
                ? Gutters.smallBMargin
                : Gutters.littleBMargin,
            ]}
          />
        </View>
        <Toast config={toastConfig} />
      </Modal>
    );
  },
);

export default ListSelectionModal;

const styles = StyleSheet.create({});
