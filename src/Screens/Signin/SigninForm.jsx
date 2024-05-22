import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from './Style';
import {Icons} from '../../Theme';
import {CustomButton, CustomHeading, CustomTextfield} from '../../Components';
import ValidationError from '../../Components/ValidationError';
import {signinSchema} from '../../Formik/schema';
import {signinInitialValues} from '../../Formik/initialValues';
import {useFormik} from 'formik';

const SignInForm = () => {
  const {navigate} = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleNavigate = path => {
    navigate(path);
  };

  const {handleChange, handleBlur, touched, errors, values, handleSubmit} =
    useFormik({
      initialValues: signinInitialValues,
      validationSchema: signinSchema,
      onSubmit: async (values, {resetForm}) => {
        try {
          handleNavigate('Main');
          console.log('succes', errors, values);
          // Toast.show({
          //   type: 'success',
          //   text1: 'Login successfully!',
          // });
        } catch (err) {
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
      <CustomButton text={'Sign In'} onPress={handleSubmit} />
    </View>
  );
};

export default SignInForm;
