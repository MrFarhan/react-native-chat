import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {CustomHeading} from '../../Components';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import {
  getAllMsgsSubscription,
  getCurrentUserData,
  sendDocument,
  sendMsg,
} from '../../service/auth';
import {Icons, colors} from '../../Theme';
import * as DocumentPicker from 'react-native-document-picker';

const ChatScreen = () => {
  const [imagePath, setImagePath] = useState('');

  const route = useRoute();
  const isFocused = useIsFocused();
  const {data} = route.params;
  const {id, name} = data || {};
  const uuid = firebase.auth().currentUser.uid;
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const getUserData = async () => {
    try {
      const data = await getCurrentUserData();
      setUserData(data._data);
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
        [id]: {...data}, // other party
        [uuid]: {...userData}, // current auth user
      };
      console.log('partiesInfo', partiesInfo);
      await sendMsg(id, uuid, msgObj, partiesInfo);
    },
    [userData?.name],
  );
  const CustomDocumentPicker = async props => {
    const newMessage = {
      _id: messages[0]._id + 1,
      user: {
        _id: uuid,
        avatar: '',
      },
      image: imagePath,
    };
    console.log('props', props);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'documentDirectory',
        mode: 'import',
        allowMultiSelection: true,
      });
      const fileUri = result[0].fileCopyUri;
      const send = await sendDocument(id, uuid, fileUri, {...newMessage});
      console.log(send, result[0], fileUri);
      if (!fileUri) {
        console.log('File URI is undefined or null');
        return;
      }
      if (fileUri.indexOf('.png') !== -1 || fileUri.indexOf('.jpg') !== -1) {
        setImagePath(fileUri);
      } else {
        // document upload working not done
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('DocumentPicker err => ', err);
        throw err;
      }
    }
  };

  const renderSend = props => {
    return (
      <View style={styles.ctaContainer}>
        <TouchableOpacity onPress={CustomDocumentPicker}>
          <Icons.FontAwesome
            name="paperclip"
            style={styles.paperClip}
            size={28}
            color={colors.primary}
          />
        </TouchableOpacity>
        <Send {...props}>
          <View style={styles.sendContainer}>
            <Icons.FontAwesome
              name="send"
              style={styles.sendButton}
              size={25}
              color={colors.primary}
            />
          </View>
        </Send>
      </View>
    );
  };

  const renderBubble = props => {
    const {currentMessage} = props;
    console.log('currentMessage', currentMessage?.doc);
    if (currentMessage?.doc) {
      return (
        <TouchableOpacity
          style={{
            ...styles.fileContainer,
            backgroundColor:
              props.currentMessage.user._id === 2 ? '#2e64e5' : '#efefef',
            borderBottomLeftRadius:
              props.currentMessage.user._id === 2 ? 15 : 5,
            borderBottomRightRadius:
              props.currentMessage.user._id === 2 ? 5 : 15,
          }}
          onPress={() => setFileVisible(true)}>
          {/* <InChatFileTransfer
            style={{marginTop: -10}}
            filePath={currentMessage.file.url}
          />
          <InChatViewFile
            props={props}
            visible={fileVisible}
            onClose={() => setFileVisible(false)}
          /> */}
          <Image source={{uri: currentMessage?.doc}} width={50} height={50} />
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                ...styles.fileText,
                color: currentMessage.user._id === 2 ? 'white' : 'black',
              }}>
              {currentMessage.text}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#efefef',
          },
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeading text={name} isBack />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: uuid,
        }}
        alwaysShowSend
        renderSend={renderSend}
        renderBubble={renderBubble}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  paperClip: {
    marginRight: 10,
    alignSelf: 'center',
    marginBottom: 5,
  },
  sendButton: {
    marginRight: 15,
    alignSelf: 'center',
    marginBottom: 10,
  },
  ctaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
});
