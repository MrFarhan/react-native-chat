import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import Icons from '../../Theme/icons';
import {styles} from './Style';
import {CustomButton, CustomHeading, CustomTextfield} from '../../Components';
import {useFormik} from 'formik';
import {updateProfileInitialValues} from '../../Formik/initialValues';
import {updateProfileSchema} from '../../Formik/schema';
import ValidationError from '../../Components/ValidationError';
import {useIsFocused} from '@react-navigation/native';
import {getCurrentUserData} from '../../service/auth';

const ProfileForm = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [loading, setLoading] = useState(true);
  const isFocus = useIsFocused();
  const getUserData = async () => {
    try {
      const data = await getCurrentUserData();
      let fields = Object.entries(data._data);
      fields?.map(([key, val]) => setFieldValue(key, val));
      setLoading(false);
    } catch (error) {
      console.log('error is ', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, [isFocus]);

  const {
    handleChange,
    handleBlur,
    touched,
    errors,
    values,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: updateProfileInitialValues,
    validationSchema: updateProfileSchema,
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

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: 600,
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <CustomHeading text={'Update Profile'} headingStyle={styles.heading} />
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
          disabled
        />
        {!!errors.email && touched.email && (
          <ValidationError errorMessage={errors.email} />
        )}
      </View>
      <CustomButton
        text={'Update'}
        buttonStyle={{marginBottom: 0, paddingBottom: 70}}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default ProfileForm;
