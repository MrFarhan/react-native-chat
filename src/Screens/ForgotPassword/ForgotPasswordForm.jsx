import React from 'react';
import {Text, View} from 'react-native';
// import {CustomButton, CustomHeading, CustomTextfield} from '..';
import {styles} from './Style';
import {CustomButton, CustomHeading, CustomTextfield} from '../../Components';

const ForgotPasswordForm = () => {
  return (
    <View>
      <CustomHeading text={'Forgot password'} headingStyle={styles.heading} />
      <Text style={styles.subHeading}>
        Get Back Your Account Quickly And Easily
      </Text>
      <View style={styles.inputContainer}>
        <CustomTextfield placeholder="Email" />
      </View>
      <CustomButton text={'Forgot Password'} />
    </View>
  );
};

export default ForgotPasswordForm;
