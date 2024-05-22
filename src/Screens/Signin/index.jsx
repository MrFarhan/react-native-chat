import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import {styles} from './Style';
import SignInForm from './SigninForm';
import {colors} from '../../Theme';

const SignIn = () => {
  const {navigate} = useNavigation();

  const handleNavigate = path => {
    navigate(path);
  };

  return (
    <SafeAreaView style={styles.main}>
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ScrollView contentContainerStyle={styles.container}>
          <SignInForm />
          <Text style={styles.pera}>
            Or sign in with {'\n'}
            Don’t have an account?{' '}
            <Text
              style={{color: colors.primary}}
              onPress={() => handleNavigate('Sign-up')}>
              Sign up
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
