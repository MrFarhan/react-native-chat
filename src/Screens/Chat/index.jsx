import React, {useState, useCallback, useEffect} from 'react';
import {FlatList, Text} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {CustomHeading} from '../../Components';
import {styles} from './Style.js';
import UserCard from './UserCard/UserCard.jsx';
import Icons from '../../Theme/icons.js';
import colors from '../../Theme/colors.js';
import {useNavigation} from '@react-navigation/native';

const Chat = () => {
  const data = [{name: 'Farhan'}, {name: 'Jawwad'}, {name: 'Saddam'}];
  const {goBack} = useNavigation();

  return (
    <>
      <CustomHeading
        text={'Chat'}
        headingStyle={styles.heading}
        rightBtn={
          <Icons.MaterialCommunityIcons
            name="logout"
            color={colors.primary}
            size={28}
            style={{marginRight: 10}}
            onPress={goBack}
          />
        }
      />
      <FlatList
        data={data}
        contentContainerStyle={styles.searchResultCardContainer}
        renderItem={({item}) => {
          return <UserCard data={item} />;
        }}
      />
    </>
  );
};

export default Chat;
