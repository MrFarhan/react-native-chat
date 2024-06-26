import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from './Style';
import {Icons} from '../../Theme';
import {CustomButton, CustomHeading, CustomTextfield} from '../../Components';
import ValidationError from '../../Components/ValidationError';
import {signinSchema} from '../../Formik/schema';
import {signinInitialValues} from '../../Formik/initialValues';
import {useFormik} from 'formik';
import Toast from 'react-native-toast-message';
import {signinUser} from '../../service/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Button} from 'react-native';
import GoogleSigninButton from './GoogleSignin';

const SignInForm = () => {
  const {navigate} = useNavigation();

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loader, setLoader] = useState(false);

  const handleNavigate = path => {
    navigate(path);
  };

  const {handleChange, handleBlur, touched, errors, values, handleSubmit} =
    useFormik({
      initialValues: signinInitialValues,
      validationSchema: signinSchema,
      onSubmit: async (values, {resetForm}) => {
        try {
          setLoader(true);
          await signinUser(values);
          setLoader(false);
        } catch (err) {
          setLoader(false);
          Toast.show({
            type: 'error',
            text1: err?.message || 'Something went wrong',
          });
          console.log('err:', err);
        }
      },
    });

  return (
    <View>
      <CustomHeading text={'Sign In'} headingStyle={styles.heading} />
      <View style={styles.inputContainer}>
        <CustomTextfield
          placeholder="Email"
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          customStyle={{}}
        />
        {!!errors.email && touched.email && (
          <ValidationError errorMessage={errors.email} />
        )}
        <CustomTextfield
          placeholder="Password"
          secureTextEntry={secureTextEntry}
          EndAdornment={() => (
            <Icons.Feather
              name={secureTextEntry ? 'eye-off' : 'eye'}
              size={20}
              onPress={() => setSecureTextEntry(prev => !prev)}
            />
          )}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
        />
        {!!errors.password && touched.password && (
          <ValidationError errorMessage={errors.password} />
        )}
        <Text
          onPress={() => handleNavigate('Forgot-password')}
          style={styles.forgotPassword}>
          Forgot password
        </Text>
      </View>
      <CustomButton
        text={'Sign In'}
        onPress={handleSubmit}
        loader={loader}
        disabled={loader}
      />

      <GoogleSigninButton />
    </View>
  );
};

export default SignInForm;
