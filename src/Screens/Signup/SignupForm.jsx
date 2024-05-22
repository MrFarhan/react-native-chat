import React, {useState} from 'react';
import {View} from 'react-native';
// import {CustomButton, CustomHeading, CustomTextfield} from '..';
import Icons from '../../Theme/icons';
import {styles} from './Style';
import {CustomButton, CustomHeading, CustomTextfield} from '../../Components';

const SignUpForm = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);

  return (
    <View>
      <CustomHeading text={'Sign Up'} headingStyle={styles.heading} />
      <View style={styles.inputContainer}>
        <CustomTextfield placeholder="Name" />
        <CustomTextfield placeholder="Email" />
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
        />
        <CustomTextfield
          placeholder="Confirm Password"
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
      <CustomButton text={'Sign Up'} />
    </View>
  );
};

export default SignUpForm;
