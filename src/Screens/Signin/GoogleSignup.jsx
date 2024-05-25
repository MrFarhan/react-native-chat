import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CustomButton} from '../../Components';
import {
  GoogleOneTapSignIn,
  statusCodes,
  isErrorWithCode,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

const GoogleSignupButton = () => {
  // Somewhere in your code
  const [state, setState] = useState(null);
  const signIn = async () => {
    try {
      const pla = await GoogleSignin.hasPlayServices();
      console.log('plapla', pla);
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      setState({userInfo});
    } catch (error) {
      console.log('errpr on', error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.NO_SAVED_CREDENTIAL_FOUND:
            // Android only. No saved credential found, try calling `createAccount`
            break;
          case statusCodes.SIGN_IN_CANCELLED:
            // sign in was cancelled
            break;
          case statusCodes.ONE_TAP_START_FAILED:
            // Android and Web only, you probably have hit rate limiting.
            // On Android, you can still call `presentExplicitSignIn` in this case.
            // On the web, user needs to click the `WebGoogleSignupButton` to sign in.
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android-only: play services not available or outdated
            break;
          default:
          // something else happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };
  console.log('state', state);
  return (
    <View>
      <CustomButton
        text="Google Sign-In"
        onPress={
          () => signIn()
          //   onGoogleButtonPress()
          //     .then(() => console.log('Signed in with Google!'))
          //     .catch(er => {
          //       console.log('error on catch ', er);
          //     })
        }
      />
    </View>
  );
};

export default GoogleSignupButton;

const styles = StyleSheet.create({});
