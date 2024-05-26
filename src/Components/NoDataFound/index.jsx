import {Text, View} from 'react-native';
import React from 'react';
import {styles} from './Style';

const NoDataComponent = () => (
  <View style={styles.container}>
    <Text style={styles.text}>No data found</Text>
  </View>
);

export default NoDataComponent;
