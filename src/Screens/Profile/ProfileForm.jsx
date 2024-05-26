import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {styles} from './Style';
import {CustomButton, CustomHeading, CustomTextfield} from '../../Components';
import {useFormik} from 'formik';
import {updateProfileInitialValues} from '../../Formik/initialValues';
import {updateProfileSchema} from '../../Formik/schema';
import ValidationError from '../../Components/ValidationError';
import {useIsFocused} from '@react-navigation/native';
import {
  getCurrentUserData,
  signOut,
  updateUser,
  uploadPicture,
} from '../../service/auth';
import {ProfilePic} from './ProfilePic';
import Toast from 'react-native-toast-message';

const ProfileForm = () => {
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  const [userData, setUserData] = useState(null);
  const isFocus = useIsFocused();
  const [loader, setLoader] = useState(false);
  const getUserData = async () => {
    try {
      const data = await getCurrentUserData();
      if (data._data.dp) {
        setUserData({dp: data._data.dp});
        setProfilePic(data._data.dp);
      }
      let fields = Object.entries(data._data);
      setUserData({name: data._data.name});
      fields?.map(([key, val]) => setFieldValue(key, val));
      setLoading(false);
    } catch (error) {
      console.log('error is ', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, [isFocus, loader]);

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
    onSubmit: async values => {
      try {
        setLoader(true);
        // check for local image
        if (profilePic && profilePic?.path?.includes('file://')) {
          const dp = await uploadPicture(profilePic.path);
          setProfilePic(dp);
        }
        if (userData?.name !== values?.name) {
          await updateUser(values, 'Users');
        }
        await getUserData();
        setLoader(false);
        Toast.show({
          type: 'success',
          text1: 'Profile updated successfully',
        });
      } catch (err) {
        console.log('catch err:', err);
      }
    },
  });

  const HandlePictureChange = image => {
    setProfilePic(image);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <CustomHeading text={'Update Profile'} headingStyle={styles.heading} />
      <ProfilePic onChange={HandlePictureChange} source={profilePic} />
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
        containerStyle={{marginBottom: 0, paddingBottom: 10}}
        onPress={handleSubmit}
        loader={loader}
      />
      <CustomButton
        text={'Signout'}
        containerStyle={{
          marginBottom: 0,
          paddingBottom: 70,
        }}
        onPress={signOut}
      />
    </View>
  );
};

export default ProfileForm;
