import {StyleSheet} from 'react-native';
import {colors} from '../../Theme';

export const styles = StyleSheet.create({
  headingContainer: {flexDirection: 'row', alignItems: 'center'},
  heading: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 20,
  },
});
