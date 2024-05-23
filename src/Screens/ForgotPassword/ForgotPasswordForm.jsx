import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from './Style';
import {CustomButton, CustomHeading, CustomTextfield} from '../../Components';
import {forgotPasswordInitialValues} from '../../Formik/initialValues';
import {forgotPasswordSchema} from '../../Formik/schema';
import {useFormik} from 'formik';
import ValidationError from '../../Components/ValidationError';
import {resetPassword} from '../../service/auth';
import Toast from 'react-native-toast-message';

const ForgotPasswordForm = () => {
  const [loader, setLoader] = useState(false);

  const {handleChange, handleBlur, touched, errors, values, handleSubmit} =
    useFormik({
      initialValues: forgotPasswordInitialValues,
      validationSchema: forgotPasswordSchema,
      onSubmit: async (values, {resetForm}) => {
        const {email} = values;
        try {
          setLoader(true);
          const data = await resetPassword(email);
          Toast.show({
            type: 'success',
            text1: 'Email Sent',
            text2: 'Reset password Link sent to your provided email',
          });
          setLoader(false);
          resetForm();
        } catch (err) {
          setLoader(false);
          Toast.show({
            type: 'error',
            text1: err?.message || 'Something went wrong on Forgot Password',
          });
        }
      },
    });

  return (
    <View>
      <CustomHeading text={'Forgot password'} headingStyle={styles.heading} />
      <Text style={styles.subHeading}>
        Get Back Your Account Quickly And Easily
      </Text>
      <View style={styles.inputContainer}>
        <CustomTextfield
          placeholder="Email"
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
        />
        {!!errors.email && <ValidationError errorMessage={errors.email} />}
      </View>
      <CustomButton text={'Forgot Password'} onPress={handleSubmit} />
    </View>
  );
};

export default ForgotPasswordForm;
