import React, {useState, useCallback, useEffect} from 'react';
import {FlatList, Text} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {CustomHeading} from '../../Components';
import {styles} from './Style.js';
import UserCard from './UserCard/UserCard.jsx';
import Icons from '../../Theme/icons.js';
import colors from '../../Theme/colors.js';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {ListUsers, signOut} from '../../service/auth.js';

const Chat = () => {
  const data = [{name: 'Farhan'}, {name: 'Jawwad'}, {name: 'Saddam'}];
  const {navigate} = useNavigation();

  const [users, setUsers] = useState([]);
  const isFocused = useIsFocused();
  const fetchUsers = async () => {
    const data = await ListUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [isFocused]);

  const HandleLogout = async () => {
    await signOut().then(() => {
      navigate('Sign-in');
    });
  };
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
            onPress={HandleLogout}
          />
        }
      />
      <FlatList
        data={users}
        contentContainerStyle={styles.searchResultCardContainer}
        renderItem={({item}) => {
          return <UserCard data={item} />;
        }}
      />
    </>
  );
};

export default Chat;
