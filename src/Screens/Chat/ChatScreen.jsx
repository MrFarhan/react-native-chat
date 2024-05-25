import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {CustomHeading} from '../../Components';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import {
  getAllMsgsSubscription,
  getCurrentUserData,
  sendMsg,
} from '../../service/auth';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const {id, name} = route.params;
  const uuid = firebase.auth().currentUser.uid;
  const isFocused = useIsFocused();

  const [userData, setUserData] = useState(null);
  console.log('user data is ', userData);
  const getUserData = async () => {
    try {
      const data = await getCurrentUserData();
      setUserData({name: data._data.name});
    } catch (error) {
      console.log('error is ', error);
    }
  };
  useEffect(() => {
    getUserData();
  }, [isFocused]);

  useEffect(() => {
    const unsubscribe = getAllMsgsSubscription(id, uuid, res => {
      setMessages(res);
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [isFocused, id]);

  const onSend = useCallback(
    async (messages = []) => {
      const msg = messages[0];
      const msgObj = {
        ...msg,
        sentBy: uuid,
        sentTo: id,
      };
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, msgObj),
      );
      let partiesInfo = {
        [id]: {name},
        [uuid]: {name: userData?.name},
      };
      console.log('partiesInfo', partiesInfo);
      await sendMsg(id, uuid, msgObj, partiesInfo);
    },
    [userData?.name],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeading text={name} isBack />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: uuid,
        }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
