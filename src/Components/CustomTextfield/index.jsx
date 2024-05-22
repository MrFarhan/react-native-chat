import React from 'react';
import {TextInput, View} from 'react-native';
// import {colors} from '../../Themes';
import {styles} from './Style';
import {colors} from '../../Theme';

const CustomTextfield = props => {
  const {
    isRemoveSpace = false,
    multiline,
    customStyle,
    placeholder,
    StartAdornment = false,
    secureTextEntry = false,
    EndAdornment = false,
    onChangeText = () => {},
    onBlur,
    value,
    onFocus,
    keyboardType = 'default',
    maxLength,
    autoCapitalize,
    autoFocus,
    endAdornmentStyle = {},
    disabled,
    numberOfLines,
  } = props;
  const handleTextChange = text => {
    // Remove spaces from the entered text
    const formattedText = text.replace(/\s/g, '');
    onChangeText(isRemoveSpace ? formattedText : text);
  };
  return (
    <View style={styles.textFieldContainer(multiline)}>
      <View style={styles.startAdornmentContainer(!!StartAdornment)}>
        {!!StartAdornment && <StartAdornment />}
      </View>
      <TextInput
        multiline={multiline}
        style={customStyle || styles.textArea(!!StartAdornment, multiline)}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
        value={value}
        onChangeText={handleTextChange}
        onFocus={onFocus}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
        editable={!disabled}
        numberOfLines={numberOfLines}
      />
      <View
        style={[
          styles.startAdornmentContainer(!!EndAdornment),
          endAdornmentStyle,
        ]}>
        {!!EndAdornment && <EndAdornment />}
      </View>
    </View>
  );
};

export default CustomTextfield;
