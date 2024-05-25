import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {CustomButton} from '../../Components';
import {useIsFocused} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {googleSignIn} from '../../service/auth';
const GoogleSigninButton = () => {
  // Somewhere in your code
  const isFocus = useIsFocused();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.webClientId,
    });
  }, [isFocus]);

  return (
    <View>
      <CustomButton onPress={googleSignIn} />
    </View>
  );
};

export default GoogleSigninButton;

const styles = StyleSheet.create({});
