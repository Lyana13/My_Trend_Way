import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

export const validateEmail = (iEmail) => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(iEmail).toLowerCase());
};
export const WarningMessageEmail = "Invalid email address.\nValid e-mail can contain only latin letters, numbers, «@» and «.»";

export const validatePassword = (iPass) => {
  let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  return re.test(String(iPass));
};
export const WarningMessagePass = "Invalid password.\nPassword must contain at least 6 characters, including UPPER/lowercase and numbers";

export const validatePasswordConfirmation = (iPass1, iPass2) => {
  return iPass1 === iPass2;
};
export const WarningMessagePassConf = "Invalid confirm Password.\nPlease enter the same Password as above";

export const validateFirstLastName = (iValue) => {
  let re = /^[ a-zA-Z\-\’]+$/;
  return re.test(String(iValue));
};
export const WarningMessageFillField = "Invalid field value.\nCan contain only latin letters, «-» and «’»";

export const validateUserName = (iValue) => {
  let re = /^[0-9a-zA-Z_.-]+$/;
  return re.test(String(iValue));
}
export const WarningMessageUserNameField = "Invalid username.\nValid username can contain\nonly latin letters, including UPPER/lowercase, numbers, «_», «.» and «-»";

export const WarningMessagePhoneNumber = "Invalid phone number.\nPlease enter the correct phone number";
export const WarningMessageFieldEmpty = "Invalid field value.\nThe field cannot be empty";

export const showToast = iMessage => {
  Toast.showWithGravity(iMessage, Toast.LONG, Toast.CENTER)
};

export const insert = (main_string, ins_string, pos) => {
  if(typeof(pos) == "undefined" || pos === '') {
    pos = 0;
  }else{
    pos = String(main_string).indexOf(pos)+1;
  }
  if(typeof(ins_string) == "undefined") {
    ins_string = '';
  }
  return String(main_string).slice(0, pos) + ins_string + String(main_string).slice(pos);
};

export const onTextFieldFocusIn = (iTarget) => {
  if(iTarget._targetInst.stateNode) {
    iTarget._targetInst.stateNode.setNativeProps({ style: { borderWidth:2 } });
  }
};

export const onTextFieldFocusOut = (iTarget) => {
  if(iTarget._targetInst.stateNode) {
    iTarget._targetInst.stateNode.setNativeProps({ style: { borderWidth:1 } });
  }
};

export const isIos = Platform.OS === 'ios';

export const storeUserToken = async (value) => {
  try {
    await AsyncStorage.setItem('@userToken18', value)
  } catch (e) {
    // saving error
  }
}

export const getUserToken = async () => {
  return AsyncStorage.getItem('@userToken18')
        .then(value => {
          console.log('>>>!!!!! TOKEN : ' + value)
          return value;
        })
      .catch(error => {

      });
}

export const getCloser = (value, checkOne, checkTwo) => {
  let summ = Math.abs(value) + Math.abs(checkOne) + Math.abs(checkTwo);
  let nValue = value+summ;
  let nOne = checkOne+summ;
  let nTwo = checkTwo+summ;
  return Math.abs(nValue - nOne) > Math.abs(nValue - nTwo) ? checkOne : checkTwo;

}
