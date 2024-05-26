import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';

export function useAuth() {
  const [user, setUser] = React.useState();

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);
  return {
    user,
  };
}
