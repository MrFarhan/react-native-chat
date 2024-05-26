import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Icons, colors, images} from '../../Theme';

const UserCard = ({data, isDeletable, HandleDelete}) => {
  const {name, id, conversationId, dp} = data || {};

  const {navigate} = useNavigation();

  return (
    <View style={styles.cardContainer}>
      {!isDeletable && (
        <Image
          source={dp ? {uri: dp} : images.user}
          width={80}
          height={80}
          style={styles.image}
        />
      )}

      <Pressable
        style={styles.pressableContainer}
        onPress={() => navigate('chat-screen', {data})}>
        <Text style={styles.userNameText}>{name}</Text>
      </Pressable>
      {isDeletable && (
        <Pressable
          style={styles.deleteContainer}
          onPress={() => HandleDelete(conversationId, id, name)}>
          <Icons.Feather
            name="trash-2"
            color={colors.red}
            size={28}
            style={styles.trashIcon}
          />
        </Pressable>
      )}
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressableContainer: {
    flex: 1,
    padding: 20,
  },
  deleteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userNameText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 25,
  },
  trashIcon: {
    marginRight: 10,
  },
  image: {
    alignSelf: 'center',
    backgroundColor: 'red',
    marginBottom: 10,
    borderRadius: 50,
    maxWidth: 80,
    maxHeight: 80,
    marginLeft: 2,
  },
});
