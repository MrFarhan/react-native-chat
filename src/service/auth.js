import {utils} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const signupUser = async values => {
  const {email, password, name} = values || {};
  const res = await auth().createUserWithEmailAndPassword(
    email?.toLowerCase(),
    password,
  );
  let userId = res?.user?.uid;
  const data = {
    userId,
    email: email?.toLowerCase(),
    name,
  };
  const newRes = await addUser(data, `Users`);
  return newRes;
};

export const signinUser = async values => {
  const {email, password} = values || {};
  const newRes = await auth().signInWithEmailAndPassword(email, password);
  return newRes;
};

export const resetPassword = async email => {
  const res = await auth().sendPasswordResetEmail(email);
  return res;
};

export const signOut = async email => {
  const res = await auth().signOut();
  return res;
};

export const addUser = async (values, path) => {
  const uid = auth().currentUser.uid;
  const add = await firestore().collection(path).doc(uid).set(values);
  return add;
};

export const updateUser = async (values, path) => {
  const uid = auth().currentUser.uid;
  const update = await firestore().collection(path).doc(uid).update(values);
  return update;
};

export const uploadPicture = async file => {
  try {
    const id = auth().currentUser.uid;
    return storage()
      .ref(`Users/${id}`)
      .putFile(file)
      .then(() => {
        return storage()
          .ref(`Users/${id}`)
          .getDownloadURL()
          .then(URL => {
            return firestore()
              .collection('Users')
              .doc(id)
              .update({
                dp: URL,
              })
              .then(() => {
                const res = {
                  status: true,
                  message: 'profile picture updated.',
                  dp: URL,
                };
                return res;
              })
              .catch(error => {
                const res = {
                  status: false,
                  error: error.message,
                };
                return res;
              });
          });
      })
      .catch(error => {
        const res = {
          status: false,
          error: error.message,
        };
        return res;
      });
  } catch (error) {
    const res = {
      status: false,
      error: error.message,
    };
    return res;
  }
};

export const getCurrentUserData = async () => {
  try {
    const currentUserId = auth().currentUser.uid;
    const user = await firestore().collection('Users').doc(currentUserId).get();
    return user;
  } catch (error) {
    throw error;
  }
};

export const ListUsers = async () => {
  try {
    let id = auth().currentUser.uid;
    const usersSnapshot = await firestore().collection('Users').get();
    const users = usersSnapshot.docs
      .filter(val => val.id !== id)
      .map(doc => ({id: doc.id, ...doc.data()}));
    return users;
  } catch (error) {
    throw error;
  }
};

export const getAllMsgs = async (id, uuid) => {
  const docId = uuid > id ? `${id}-${uuid}` : `${uuid}-${id}`;

  const querySnap = await firestore()
    .collection('conversations')
    .doc(docId)
    .collection('messages')
    .orderBy('createdAt', 'desc')
    .get();
  const allMsgs = querySnap.docs.map(docSnap => {
    return {
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toDate(),
    };
  });
  return allMsgs;
};

export const getAllMsgsSubscription = (id, uuid, callback) => {
  const docId = uuid > id ? `${id}-${uuid}` : `${uuid}-${id}`;

  const msgRef = firestore()
    .collection('conversations')
    .doc(docId)
    .collection('messages')
    .orderBy('createdAt', 'desc');

  return msgRef.onSnapshot(querySnap => {
    const allMsgs = querySnap.docs.map(docSnap => {
      const data = docSnap.data();
      console.log('data is ', data);
      return {
        ...data,
        createdAt: data?.createdAt ? data.createdAt.toDate() : new Date(),
      };
    });
    callback(allMsgs);
  });
};

export const sendMsg = async (id, uuid, msg, partiesInfo) => {
  const docId = uuid > id ? `${id}-${uuid}` : `${uuid}-${id}`;

  await firestore()
    .collection('conversations')
    .doc(docId)
    .set(
      {
        parties: {[id]: true, [uuid]: true},
        partiesInfo: partiesInfo,
      },
      {merge: true},
    );

  const res = await firestore()
    .collection('conversations')
    .doc(docId)
    .collection('messages')
    .add({...msg, createdAt: firestore.FieldValue.serverTimestamp()});

  return res;
};

export const ChatHistory = async () => {
  try {
    const uid = auth().currentUser.uid;
    const querySnapshot = await firestore().collection('conversations').get();

    const conversations = querySnapshot.docs
      .filter(doc => doc.data().parties && !!doc.data().parties[uid])
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

    return conversations;
  } catch (error) {
    throw error;
  }
};

export const DeleteChat = async (conversationId, userId) => {
  try {
    console.log(
      'Received IDs - Conversation ID:',
      conversationId,
      'User ID:',
      userId,
    );

    const conversationRef = firestore()
      .collection('conversations')
      .doc(conversationId);

    const conversationSnapshot = await conversationRef.get();
    console.log(
      'Conversation Snapshot:',
      conversationSnapshot.exists ? 'Exists' : 'Does not exist',
    );

    if (!conversationSnapshot.exists) {
      throw new Error(`Conversation with ID ${conversationId} not found.`);
    }

    // Checking the structure of the document before updating
    console.log('Document data:', conversationSnapshot.data());

    await conversationRef.update({[`parties.${userId}`]: false});

    console.log('Update successful');

    return true; // Assuming successful update
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

export const googleSignIn = async () => {
  try {
    const {idToken} = await GoogleSignin.signIn();
    console.log('idToken', idToken);
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log('googleCredential', googleCredential);
    const userInfo = await auth().signInWithCredential(googleCredential);
    console.log('userInfo', userInfo);
    if (userInfo?.additionalUserInfo?.isNewUser) {
      let data = {
        name: userInfo.user._user.displayName,
        userId: userInfo.user._user.uid,
        email: userInfo.user._user.email,
        dp: userInfo.user._user.photoURL,
        type: 'google',
      };
      console.log('data to update is ', data);
      const update = await addUser(data, 'Users');
      console.log('hello', update);
    } else {
      console.log('else ');
      // setErrResponse({ status: false, error: 'Error' });
    }
  } catch (error) {
    console.log('error ', error);
    // setErrResponse({ status: false, error: error.message });
  }
};
