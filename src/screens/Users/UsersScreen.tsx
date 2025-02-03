import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';

const UsersMainScreen = () => {
  useEffect(() => {
    console.log('user');
  }, []);
  return (
    <AppScreenBackground>
      <AppScreenBackground.Body>
        <Text></Text>
      </AppScreenBackground.Body>
    </AppScreenBackground>
  );
};

export default UsersMainScreen;

const styles = StyleSheet.create({});
