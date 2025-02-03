import {StyleSheet} from 'react-native';
import React from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';
import CustomScroll from '@/components/CustomScroll';
import RowCard from '@/components/RowCard/RowCard';

const EventsSettingScreen = ({navigation}: any) => {
  return (
    <AppScreenBackground>
      <AppScreenBackground.Header backPress={() => navigation.goBack()}>
        Settings
      </AppScreenBackground.Header>
      <AppScreenBackground.Body>
        <CustomScroll>
          <RowCard.Title
            title="Venues"
            onPress={() => navigation.navigate('VanuesListScreen')}
          />
          <RowCard.Title
            title="Clients"
            onPress={() => navigation.navigate('ClientsScreen')}
          />
          <RowCard.Title
            title="Calendars"
            onPress={() => navigation.navigate('CalendarScreen')}
          />
        </CustomScroll>
      </AppScreenBackground.Body>
    </AppScreenBackground>
  );
};

export default EventsSettingScreen;

const styles = StyleSheet.create({});
