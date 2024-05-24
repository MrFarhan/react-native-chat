import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {CustomHeading, UserCard} from '../../Components/index.js';
import {styles} from './Style.js';
import Icons from '../../Theme/icons.js';
import colors from '../../Theme/colors.js';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ListUsers, signOut} from '../../service/auth.js';

const Users = () => {
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
    await signOut().then(() => {});
  };
  return (
    <SafeAreaView>
      <CustomHeading
        text={'Users'}
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
    </SafeAreaView>
  );
};

export default Users;
