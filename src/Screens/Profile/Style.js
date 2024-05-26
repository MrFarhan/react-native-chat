import {StyleSheet} from 'react-native';
import {colors} from '../../Theme';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subHeading: {fontSize: 12, marginBottom: 20, color: colors.gray_font},
  inputContainer: {
    width: '100%',
    marginVertical: 20,
    gap: 24,
  },
  forgotPassword: {
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    fontSize: 16,
    color: colors.primary,
  },
  peraText: {
    fontSize: 15,
    fontWeight: ' 400',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 20,
  },
  radioContainer: {flexDirection: 'row', gap: 20},
  radioGroup: {flexDirection: 'row', gap: 5, alignItems: 'center'},
  radio: toggle => ({
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: toggle ? colors.primary : colors.white,
  }),

  scroll: {
    backgroundColor: 'white',
    flex: 1,
  },
  userRow: {
    alignItems: 'center',
    padding: 15,
    marginTop: 70,
  },
  content: {
    flex: 1,
    backgroundColor: '#d8d8db',
  },

  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 600,
  },
});
