import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import styles from './screenheader.style';

const ScreenHeaderBtn = ({ dimension, handlePress, iconUrl }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image style={styles.btnImg(dimension)} source={iconUrl} resizeMode="cover" />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
