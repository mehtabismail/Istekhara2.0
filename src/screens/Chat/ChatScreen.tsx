import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AppScreenBackground from '@/components/AppScreenBackground';

const ChatScreen = () => {
  useEffect(() => {
    console.log('chat');
  }, []);
  return (
    <AppScreenBackground>
      <AppScreenBackground.Body>
        <Text></Text>
      </AppScreenBackground.Body>
    </AppScreenBackground>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
