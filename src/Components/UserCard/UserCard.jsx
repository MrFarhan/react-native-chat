import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Icons, colors} from '../../Theme';

const UserCard = ({data, isDeletable}) => {
  const {name, id} = data || {};

  const {navigate} = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Pressable
        style={{...styles.container, width: isDeletable ? '80%' : '100%'}}
        onPress={() => navigate('chat-screen', {name, id})}>
        <Text style={{color: colors.primary, fontWeight: 'bold', fontSize: 25}}>
          {name}
        </Text>
      </Pressable>
      {isDeletable && (
        <Pressable
          style={{...styles.container, width: '20%'}}
          onPress={() => Alert.alert('delete clicked')}>
          <Icons.Feather
            name="trash-2"
            color={colors.red}
            size={28}
            style={{marginRight: 10}}
          />
        </Pressable>
      )}
    </View>
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
