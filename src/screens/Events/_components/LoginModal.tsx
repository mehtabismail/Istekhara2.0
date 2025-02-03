import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@/hooks';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {useAppSelector} from '@/store';
import {useLazySetCalendarQuery} from '@/services/modules/Events/team';
import Loader from '@/components/Loader';
import {useNavigation} from '@react-navigation/native';

const LoginModal = ({
  URL,
  navigation,
  addNewTeam,
}: {
  URL: string;
  navigation: any;
  addNewTeam?: boolean;
}) => {
  const {Layout, Gutters, Colors, Fonts, Images} = useTheme();
  const [setCalendar] = useLazySetCalendarQuery();
  const {goBack} = useNavigation();
  const {token} = useAppSelector(state => state.auth);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  function getParameterValue(url: string, parameterName: string) {
    const startIndex = url.indexOf(parameterName + '=');
    if (startIndex !== -1) {
      const endIndex = url.indexOf('&', startIndex);
      const value =
        endIndex !== -1
          ? url.substring(startIndex + parameterName.length + 1, endIndex)
          : url.substring(startIndex + parameterName.length + 1);
      return decodeURIComponent(value);
    }
    return null;
  }

  return (
    <View style={[Layout.fill]}>
      {loading ? (
        <Loader />
      ) : (
        <WebView
          userAgent={
            Platform.OS === 'android'
              ? 'Chrome/18.0.1025.133 Mobile Safari/535.19'
              : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'
          }
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mixedContentMode="compatibility"
          originWhitelist={['*']}
          source={{uri: URL}}
          onNavigationStateChange={async (state: WebViewNavigation) => {
            const {url} = state;
            console.log('url==>', url);
            if (url.includes('google/oauth2callback?code=')) {
              let _code = getParameterValue(url, 'code');
              _code && setCode(_code);
            } else if (code && url.includes(`/google/oauth2callback`)) {
              let endpoint = 'google/oauth2cb';
              setLoading(true);
              setCalendar({token, code, endpoint}).then(res => {
                setLoading(false);
                if (res?.data) {
                  navigation.goBack();
                }
              });
            } else if (code && url == `${process.env.FRONTEND_URL}outlookURL`) {
              let endpoint = 'outlook/oauth2cb';
              setLoading(true);
              setCalendar({token, code, endpoint}).then(res => {
                setLoading(false);
                if (res?.data) {
                  goBack();
                }
              });
            }
          }}
        />
      )}
    </View>
  );
};

export default LoginModal;

const styles = StyleSheet.create({});
