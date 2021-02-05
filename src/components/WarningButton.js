import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import WarningIcon from '../../assets/icons/warning.svg';
import {hitSlop, scale} from '../styles';
import {showToast} from '../utils/helpers';

function WarningButton({message, style} = iProps) {

  const showMessage = () => showToast(message);

  return(
    <TouchableOpacity style={[s.cnt, style]} activeOpacity={0.5} hitSlop={hitSlop} onPress={showMessage}>
      <WarningIcon width={scale(22)} height={scale(22)}/>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  cnt: {
    width: scale(55),
    height: scale(55),
  },
});

export default memo(WarningButton);
