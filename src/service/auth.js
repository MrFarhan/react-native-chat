import {utils} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
  const add = firestore().collection(path).doc(uid).set(values);
  return add;
};

export const updateUser = async (values, path) => {
  const uid = auth().currentUser.uid;
  const update = firestore().collection(path).doc(uid).update(values);
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
    console.error('Error listing users:', error);
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
    console.error('Error listing users:', error);
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

export const sendMsg = async (id, uuid, msg) => {
  const docId = uuid > id ? `${id}-${uuid}` : `${uuid}-${id}`;

  const partyAdd = await firestore()
    .collection('conversations')
    .doc(docId)
    .set(
      {
        parties: {[id]: true, [uuid]: true},
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
