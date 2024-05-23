import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const signupUser = async values => {
  const {email, password, name} = values || {};
  const res = await auth().createUserWithEmailAndPassword(
    email?.toLowerCase(),
    password,
  );
  console.log('res is ', res);
  let userId = res?.user?.uid;
  const data = {
    userId,
    email: email?.toLowerCase(),
    name,
  };
  const newRes = await updateUser(data, userId, `Users`);
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

export const updateUser = async (values, id, path) => {
  const update = firestore().collection(path).doc(id).set(values);
  return update;
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
    const usersSnapshot = await firestore().collection('Users').get();
    const users = usersSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    return users;
  } catch (error) {
    console.error('Error listing users:', error);
    throw error;
  }
};
