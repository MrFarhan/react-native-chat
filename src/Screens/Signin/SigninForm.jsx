import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from './Style';
import {Icons} from '../../Theme';
import {CustomButton, CustomHeading, CustomTextfield} from '../../Components';

const SignInForm = () => {
  const {navigate} = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleNavigate = path => {
    navigate(path);
  };
  const handleSubmit = () => {
    handleNavigate('Main');
  };

  return (
    <View>
      <CustomHeading text={'Sign In'} headingStyle={styles.heading} />
      <View style={styles.inputContainer}>
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
