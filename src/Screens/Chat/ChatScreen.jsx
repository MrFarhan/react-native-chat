import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {CustomHeading} from '../../Components';
import {useRoute} from '@react-navigation/native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const {id, name} = route.params;

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

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <>
      <CustomHeading text={name} isBack />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
