import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {CustomHeading} from '../../Components';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {useAuth} from '../../hooks/useAuth';
import {firebase} from '@react-native-firebase/auth';
import {getAllMsgs, sendMsg} from '../../service/auth';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const {id, name} = route.params;
  const uuid = firebase.auth().currentUser.uid;
  const isFocused = useIsFocused();
  useEffect(() => {
    getAllMsgs(id, uuid).then(res => {
      console.log('data', res);
      setMessages(res);
    });
  }, [isFocused]);

  console.log('navigation', route.params);
  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       image: 'https://facebook.github.io/react/img/logo_og.png',
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const msgObj = {
      ...msg,
      sendtBy: uuid,
      sentTo: id,
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, msgObj),
    );
    await sendMsg(id, uuid, msgObj);
  }, []);

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
