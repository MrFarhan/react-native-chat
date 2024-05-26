import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {CustomHeading, UserCard} from '../../Components/index.js';
import {styles} from './Style.js';
import {useIsFocused} from '@react-navigation/native';
import {ListUsers} from '../../service/auth.js';

const Users = () => {
  const [users, setUsers] = useState([]);
  const isFocused = useIsFocused();

  const fetchUsers = async () => {
    const data = await ListUsers();
    setUsers(data);
  };
  useEffect(() => {
    fetchUsers();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeading text={'Users'} headingStyle={styles.heading} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
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
