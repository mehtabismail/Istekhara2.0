import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@/hooks';
import {FlashList} from '@shopify/flash-list';
import {mS} from '@/utils/functions';
import Button from '@/components/Button';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '@/store';
import {setShowMembers} from '@/store/myShifts';

const TeamsDetail = ({data, header}: any) => {
  const {Layout, Gutters, Fonts, Colors, Images} = useTheme();
  // const [showMembers, setShowMembers] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {show_members} = useAppSelector(state => state.myShifts);

  return (
    <View style={[Gutters.smallBMargin]}>
      <View
        style={[
          Layout.row,
          Layout.alignItemsCenter,
          Layout.justifyContentBetween,
          Gutters.smallHMargin,
          Gutters.xLittleVMargin,
        ]}>
        <Text
          style={[Fonts.OpenSans18_Bold_111111, {color: Colors.gray_707070}]}>
          Your Team
        </Text>
        <View
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            Gutters.littleVPadding,
            Gutters.xLittleHPadding,
            {borderRadius: 20, backgroundColor: Colors.yellowPrimary_FFF0BF},
          ]}>
          <Images.svgIcon.starPerson width={mS(15)} height={mS(15)} />
          <Text
            style={[
              Fonts.OpenSans10_Bold_DBDBDB,
              Fonts.black_111111,
              Gutters.tinyLMargin,
            ]}>
            Crew Chief
          </Text>
        </View>
      </View>
      <FlatList
        keyExtractor={(item: any) => item?._id}
        data={data?.shift_teams}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              console.log(item?._id);
              dispatch(setShowMembers(item?._id));
            }}
            style={[
              Layout.fullWidth,

              Gutters.smallHPadding,
              Gutters.smallVPadding,
              Gutters.littleBMargin,
              {backgroundColor: Colors.yellowLite_FFFAEA},
            ]}>
            <View
              style={[
                Layout.row,
                Layout.alignItemsCenter,
                Layout.justifyContentBetween,
              ]}>
              <Text
                style={[
                  Fonts.OpenSans15_Bold_111111,
                  {color: Colors.blackPrimary_111111},
                ]}>
                {item?.name}
              </Text>
              <View
                style={[
                  Layout.center,
                  {
                    height: mS(25),
                    width: mS(25),
                    borderRadius: mS(25 / 2),
                    backgroundColor: Colors.white,
                    borderWidth: mS(1.5),
                    borderColor: Colors.gray_707070,
                  },
                ]}>
                <Text
                  style={[
                    Fonts.OpenSans12_Regular_111111,
                    {color: Colors.gray_707070},
                  ]}>
                  {item?.limit}
                </Text>
              </View>
            </View>
            {show_members == item?._id && (
              <View style={[Gutters.littleVMargin]}>
                <FlatList
                  keyExtractor={(item: any) => item?._id}
                  data={item?.members}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}: any) => (
                    <View style={[Layout.row, Gutters.tinyBMargin]}>
                      <Text
                        style={[
                          Fonts.OpenSans16_Regular_white,
                          {color: Colors.blackPrimary_111111},
                        ]}>
                        {item?.user?.first_name +
                          '' +
                          ' ' +
                          item?.user?.last_name}
                      </Text>
                      {!!item?.crew_chief && (
                        <Images.svgIcon.star
                          width={mS(15)}
                          height={mS(15)}
                          color={Colors.green_45A300}
                        />
                      )}
                    </View>
                  )}
                />
                <Button
                  title="View All Tasks"
                  onPress={() => {
                    dispatch(setShowMembers(null));
                    navigation.navigate('TaskScreen', {
                      team_id: item?._id,
                      team_name: item?.name,
                      header: header,
                    });
                  }}
                  containerStyle={[
                    Gutters.xLittleHMargin,
                    Gutters.smallTMargin,
                  ]}
                />
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TeamsDetail;
