import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './Style';

const CustomButton = props => {
  const {onPress = () => {}, text, buttonStyle = {}} = props;
  return (
    <View style={[styles.btnContainer, buttonStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.btn}>
        <Text style={styles.btnText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
