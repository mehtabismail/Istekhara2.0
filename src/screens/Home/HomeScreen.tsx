import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';

const HomeScreen = () => {
  useEffect(() => {
    console.log('home');
  }, []);
  return (
    <AppScreenBackground>
      <AppScreenBackground.Body>
        <Text></Text>
      </AppScreenBackground.Body>
    </AppScreenBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
