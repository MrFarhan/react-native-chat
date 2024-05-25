import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {CustomHeading, UserCard} from '../../Components';
import {styles} from './Style.js';
import Icons from '../../Theme/icons.js';
import colors from '../../Theme/colors.js';
import {useIsFocused} from '@react-navigation/native';
import {ChatHistory, DeleteChat, signOut} from '../../service/auth.js';
import {useAuth} from '../../hooks/useAuth.js';

const Chat = () => {
  const [history, setHistory] = useState([]);
  const isFocused = useIsFocused();
  const {user} = useAuth();

  const HandleDelete = async conversationId => {
    await DeleteChat(conversationId, user?.uid);
    fetchHistory();
  };

  const fetchHistory = async () => {
    try {
      const chatHistory = await ChatHistory();
      const currentUserId = user?.uid;
      if (!chatHistory?.length) {
        setHistory(null);
      }
      const filteredConversations = chatHistory.map(conversation => {
        // delete conversation[currentUserId];
        if (conversation?.['parties']?.[currentUserId]) {
        }
        const otherPartyId = Object.entries(conversation.parties).find(
          key => !!key[1] && key !== currentUserId,
        );
        console.log('removed false 1', otherPartyId);
        return {
          ...conversation,
          conversationId: conversation.id,
          id: otherPartyId[0],
          name: conversation.partiesInfo[otherPartyId[0]]?.name || 'Unknown',
        };
      });
      setHistory(filteredConversations);
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [isFocused]);
  console.log('chat history ', history);
  const HandleLogout = async () => {
    await signOut().then(() => {});
  };
  return (
    <SafeAreaView>
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
        data={history}
        ListEmptyComponent={() => {
          <View>
            <Text>No data found</Text>
          </View>;
        }}
        keyExtractor={key => key.id}
        contentContainerStyle={styles.searchResultCardContainer}
        renderItem={({item}) => {
          return (
            <UserCard data={item} isDeletable HandleDelete={HandleDelete} />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Chat;
