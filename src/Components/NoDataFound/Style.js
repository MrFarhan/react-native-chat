import {StyleSheet} from 'react-native';
import {colors} from '../../Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray,
  },
});
