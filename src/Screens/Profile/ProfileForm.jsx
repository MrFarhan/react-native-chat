import React, {useState} from 'react';
import {View} from 'react-native';
import Icons from '../../Theme/icons';
import {styles} from './Style';
import {CustomButton, CustomHeading, CustomTextfield} from '../../Components';
import {useFormik} from 'formik';
import {updateProfileInitialValues} from '../../Formik/initialValues';
import {updateProfileSchema} from '../../Formik/schema';
import ValidationError from '../../Components/ValidationError';

const ProfileForm = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);

  const {handleChange, handleBlur, touched, errors, values, handleSubmit} =
    useFormik({
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

  return (
    <>
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
        />
        {!!errors.email && touched.email && (
          <ValidationError errorMessage={errors.email} />
        )}
        <CustomTextfield
          placeholder="Old Password"
          secureTextEntry={secureTextEntry}
          EndAdornment={() => (
            <Icons.Feather
              name={secureTextEntry ? 'eye-off' : 'eye'}
              size={20}
              onPress={() => setSecureTextEntry(prev => !prev)}
            />
          )}
        />
        <CustomTextfield
          placeholder="New Password"
          secureTextEntry={secureTextEntry2}
          EndAdornment={() => (
            <Icons.Feather
              name={secureTextEntry2 ? 'eye-off' : 'eye'}
              size={20}
              onPress={() => setSecureTextEntry2(prev => !prev)}
            />
          )}
        />
      </View>
      <CustomButton
        text={'Update'}
        buttonStyle={{marginBottom: 0, paddingBottom: 70}}
        onPress={handleSubmit}
      />
    </>
  );
};

export default ProfileForm;
