import {StyleSheet} from 'react-native';
import {colors} from '../../Theme';

export const styles = StyleSheet.create({
  textFieldContainer: multiline => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: multiline ? 'flex-start' : 'center',
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 6,
    maxHeight: multiline ? 200 : 50,
    minHeight: multiline && 100,
  }),
  startAdornmentContainer: startAdornment => ({
    display: startAdornment ? 'flex' : 'none',
    width: 50,
    alignItems: 'center',
  }),
  textArea: (startAdornment, multiline) => ({
    borderColor: colors.gray,
    borderLeftWidth: startAdornment ? 1 : 0,
    padding: 10,
    paddingTop: 10,
    flex: 1,
    textAlignVertical: multiline ? 'top' : 'center',
  }),
  defaultInput: {
    color: 'black',
  },
});
