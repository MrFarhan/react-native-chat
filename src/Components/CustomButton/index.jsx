import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './Style';
import {colors} from '../../Theme';

const CustomButton = props => {
  const {onPress = () => {}, text, buttonStyle = {}, loader, disabled} = props;
  return (
    <View style={[styles.btnContainer, buttonStyle]}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          ...styles.btn,
          backgroundColor: disabled ? 'gray' : colors.primary,
        }}>
        {loader ? (
          <ActivityIndicator color={colors.black} />
        ) : (
          <Text style={styles.btnText}>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
