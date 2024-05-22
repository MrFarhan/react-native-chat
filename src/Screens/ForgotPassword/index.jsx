import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
// import {ForgotPasswordForm} from '../../Components';
import {colors} from '../../Theme';
import {styles} from './Style';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPassword = () => {
  const {navigate} = useNavigation();

  const handleNavigate = path => {
    navigate(path);
  };

  return (
    <SafeAreaView style={styles.main}>
      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // adjust the value according to your needs
      >
        <ScrollView contentContainerStyle={styles.container}>
          <ForgotPasswordForm />
          <Text style={styles.pera}>
            Back to{' '}
            <Text
              onPress={() => handleNavigate('Sign-in')}
              style={{color: colors.primary}}>
              Log In
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
