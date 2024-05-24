import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {CustomHeading} from '../../Components';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import {getAllMsgsSubscription, sendMsg} from '../../service/auth';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const {id, name} = route.params;
  const uuid = firebase.auth().currentUser.uid;
  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = getAllMsgsSubscription(id, uuid, res => {
      setMessages(res);
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [isFocused, id]);

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
    console.log('on send calling');
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
