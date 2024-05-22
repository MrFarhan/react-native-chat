import React from 'react';
import {Text} from 'react-native';
import {style} from './Style';

const ValidationError = props => {
  const {errorMessage, customStyle} = props;
  return <Text style={[style.textError, customStyle]}>{errorMessage}</Text>;
};

export default ValidationError;
