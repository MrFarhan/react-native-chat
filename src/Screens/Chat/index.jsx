import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, Text, View, Pressable} from 'react-native';
import {CustomHeading, UserCard} from '../../Components';
import {styles} from './Style.js';
import Icons from '../../Theme/icons.js';
import colors from '../../Theme/colors.js';
import {useIsFocused} from '@react-navigation/native';
import {ChatHistory, DeleteChat, signOut} from '../../service/auth.js';
import {useAuth} from '../../hooks/useAuth.js';
import NoDataComponent from '../../Components/NoDataFound/index.jsx';

const Chat = () => {
  const [history, setHistory] = useState([]);
  const isFocused = useIsFocused();
  const {user} = useAuth();

  const HandleDelete = async conversationId => {
    try {
      await DeleteChat(conversationId, user?.uid);
      fetchHistory();
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  const fetchHistory = async () => {
    try {
      const chatHistory = await ChatHistory();
      const currentUserId = user?.uid;
      if (!chatHistory?.length) {
        setHistory([]);
        return;
      }
      const filteredConversations = chatHistory
        .map(conversation => {
          const otherParty = Object.entries(conversation.parties).find(
            ([key, value]) => value && key !== currentUserId,
          );
          if (!otherParty) return null;
          const [otherPartyId] = otherParty;
          return {
            ...conversation,
            conversationId: conversation.id,
            id: otherPartyId,
            name: conversation.partiesInfo[otherPartyId]?.name || 'Unknown',
          };
        })
        .filter(Boolean);
      setHistory(filteredConversations);
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeading text={'Chat'} headingStyle={styles.heading} />
      <FlatList
        data={history}
        ListEmptyComponent={NoDataComponent}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.searchResultCardContainer}
        renderItem={({item}) => (
          <UserCard
            data={item}
            isDeletable={true}
            HandleDelete={HandleDelete}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Chat;
