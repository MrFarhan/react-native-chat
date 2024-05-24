import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const UserCard = ({data}) => {
  const {name, id} = data || {};

  const {navigate} = useNavigation();

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigate('chat-screen', {name, id})}>
      <Text>{name}</Text>
    </Pressable>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e5e4e4',
    marginBottom: 5,
  },
});
