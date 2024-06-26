import React, {useState} from 'react';
import {View} from 'react-native';
import Icons from '../../Theme/icons';
import {styles} from './Style';
import {CustomButton, CustomHeading, CustomTextfield} from '../../Components';
import {useFormik} from 'formik';
import {signupInitialValues} from '../../Formik/initialValues';
import {signupSchema} from '../../Formik/schema';
import ValidationError from '../../Components/ValidationError';
import {signupUser} from '../../service/auth';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const SignUpForm = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);

  const [loader, setLoader] = useState(false);
  const {navigate} = useNavigation();

  const {
    handleChange,
    handleBlur,
    touched,
    errors,
    values,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: signupInitialValues,
    validationSchema: signupSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        setLoader(true);
        const result = await signupUser(values);
        setLoader(false);
        Toast.show({
          type: 'success',
          text1: 'Signedup successfully!',
        });
        navigate('Main');
      } catch (err) {
        setLoader(false);
        console.log('err:', err.message);
        Toast.show({
          type: 'error',
          text1: err.message || 'Something went wrong',
        });
      }
    },
  });

  return (
    <View>
      <CustomHeading text={'Sign Up'} headingStyle={styles.heading} />
      <View style={styles.inputContainer}>
        <CustomTextfield
          placeholder="Name"
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.name}
        />
        {!!errors.name && touched.name && (
          <ValidationError errorMessage={errors.name} />
        )}
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
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          secureTextEntry={secureTextEntry}
          EndAdornment={() => (
            <Icons.Feather
              name={secureTextEntry ? 'eye-off' : 'eye'}
              size={20}
              onPress={() => setSecureTextEntry(prev => !prev)}
            />
          )}
        />
        {!!errors.password && touched.password && (
          <ValidationError errorMessage={errors.password} />
        )}
      </View>
      <CustomButton text={'Sign Up'} onPress={handleSubmit} loader={loader} />
    </View>
  );
};

export default SignUpForm;
