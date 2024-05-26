import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {colors} from '../../Theme';
import Icons from '../../Theme/icons';
import {styles} from './Style';

const CustomHeading = props => {
  const {text, isBack = false, headingStyle = {}, rightBtn} = props;
  const {goBack} = useNavigation();

  return (
    <View style={styles.headingContainer}>
      <View style={styles.headingSubContainer}>
        {isBack && (
          <Icons.Ionicons
            name="arrow-back"
            color={colors.primary}
            size={28}
            style={{marginRight: 10}}
            onPress={goBack}
          />
        )}
        <Text style={[styles.heading, headingStyle]}>{text}</Text>
      </View>
      {!!rightBtn && rightBtn}
    </View>
  );
};

export default CustomHeading;
