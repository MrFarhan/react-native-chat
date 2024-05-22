import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import {colors} from '../../Theme';
import {styles} from './Style';
import SignUpForm from './SignupForm';

const Signup = () => {
  const {navigate} = useNavigation();

  const handleNavigate = path => {
    navigate(path);
  };

  return (
    <SafeAreaView style={styles.main}>
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
        <ScrollView contentContainerStyle={styles.container}>
          <SignUpForm />
          <Text style={styles.pera}>
            Or sign in with {'\n'}
            Already have an account?{' '}
            <Text
              style={{color: colors.primary}}
              onPress={() => handleNavigate('Sign-in')}>
              Sign In
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;
