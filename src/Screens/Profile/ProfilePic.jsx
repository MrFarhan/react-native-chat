import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {images} from '../../Theme';

export const ProfilePic = props => {
  const {onChange, source} = props || {};
  const [uri, setUri] = useState(source || undefined);
  const pickPicture = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setUri(image.path);
      onChange?.(image);
    });
  };
  let img = uri ? {uri: uri} : images.user;
  return (
    <TouchableOpacity onPress={pickPicture}>
      <Image style={styles.avatar} {...props} source={img} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    paddingTop: 20,
    height: 130,
    width: 130,
    borderRadius: 100,
    padding: 20,
    alignSelf: 'center',
  },
});
