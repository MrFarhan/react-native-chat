import React, {useState} from 'react';
import {View} from 'react-native';
// import {
//   CurrencyDropDown,
//   CustomButton,
//   CustomHeading,
//   CustomTextfield,
//   LocationDropDown,
// } from '..';
import Icons from '../../Theme/icons';
import {styles} from './Style';
import {CustomButton, CustomHeading, CustomTextfield} from '../../Components';

const ProfileForm = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);

  return (
    <>
      <CustomHeading text={'Update Profile'} headingStyle={styles.heading} />
      <View style={styles.inputContainer}>
        <CustomTextfield placeholder="Name" />
        <CustomTextfield placeholder="Email" />
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
      />
    </>
  );
};

export default ProfileForm;
