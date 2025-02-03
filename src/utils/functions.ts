import {Dimensions} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import RNRestart from 'react-native-restart';
import {toast} from './toast';
import {persistor, store} from '@/store';
import {logout} from '@/store/auth';
import moment from 'moment';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const currentState = store.getState();
const dispatch = store.dispatch;

// screen height in percentage
const sHight = (val: number) => {
  return (val / 100) * windowHeight;
};

// screen width in percentage
const sWidth = (val: number) => {
  return (val / 100) * windowWidth;
};

// horizontal scale
const hS = (size: number) => {
  return scale(size);
};

// verticle scale
const vS = (size: number) => {
  return verticalScale(size);
};

// moderate scale
const mS = (size: number, factor?: number) => {
  return moderateScale(size * 0.9, factor);
};

function isEmailValid(email: string) {
  if (/^\s*[\w.+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+\s*$/.test(email)) {
    return true;
  } else return false;
}

function isPhoneValid(phone: string) {
  if (/^\+[1-9]\d{9,14}$/.test(phone)) {
    return true;
  } else return false;
}

function isNumberString(str: string) {
  if (/^\d+$/.test(str)) {
    return true;
  } else return false;
}

function capitalizeWords(str: string) {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const getApiFormattedDate = (date: Date | string) => {
  return moment(date).format('YYYY-MM-DD');
};

const formatToDropDownArray = (
  arry: any[],
  labelField: string,
  valueField: string,
  isDate?: boolean,
) => {
  let data = arry?.map(val => ({
    label: isDate
      ? moment(val[labelField])?.format('DD/MM/YYYY')
      : val[labelField],
    value: val[valueField],
    data: val,
  }));
  return data;
};

const handleApiError = async (error: any) => {
  console.log('API Error response ==>>', JSON.stringify(error));
  if (error?.error?.status == 401 && error?.error?.data?.message) {
    toast.error(error?.error?.data?.message);
    if (error?.error?.data?.message == 'Invalid token.') {
      logoutApp();
    }
    // if (error?.error?.data?.message) {
    // if (error?.error?.data?.message == 'Invalid Credentials') {
    // toast.error(error.error.data.message);
    // } else {
    // toast.error(error.error.data.message);
    // setTimeout(async () => {
    //   dispatch(logout()), await persistor.purge();
    //   await persistor.flush();
    //   RNRestart.Restart();
    // }, 1000);
    // }
    // } else {
    // dispatch(logout()), await persistor.purge();
    // await persistor.flush();
    // RNRestart.Restart();
    // }
  }
  //  else if (error?.error?.status == 403) {
  //   toast.error('')
  // if (currentState.auth?.token) {
  //   dispatch(logout()), await persistor.purge();
  //   await persistor.flush();
  //   RNRestart.Restart();
  // } else {
  //   showMessage({
  //     message: 'Your porfile is deleted.',
  //     type: 'danger',
  //     position: 'top',
  //   });
  // }
  // }
  else if (error?.error?.data?.errors?.length > 0) {
    toast.error(error?.error?.data?.errors[0]);
  } else if (typeof error?.error?.data?.error == 'string') {
    toast.error(JSON.stringify(error.error.data.error));
  } else if (error?.error?.data?.message) {
    if (typeof error?.error?.data?.message == 'string') {
      toast.error(error.error.data.message);
    } else {
      toast.error(JSON.stringify(error.error.data.message));
    }
  } else {
    toast.error('Something went wrong');
  }
};

function convertTo24Hour(time: string) {
  // Split the time into hours, minutes, and period (AM/PM)
  const [timePart, modifier] = time?.split(' ');
  let [hours, minutes] = timePart?.split(':');
  // Convert hours to 24-hour format
  if (modifier === 'PM' && hours !== '12') {
    hours = parseInt(hours, 10) + 12;
  } else if (modifier === 'AM' && hours === '12') {
    hours = '00';
  }
  // Ensure hours and minutes are in "00" format
  hours = hours?.toString().padStart(2, '0');
  minutes = minutes?.padStart(2, '0');
  return `${hours}:${minutes}`;
}

const logoutApp = async () => {
  dispatch(logout());
  await persistor.purge();
  RNRestart.Restart();
};

const getStringWithCount = async (count: number, String: string) => {
  let formatedCount = count < 10 && count > 0 ? '0' + count : count;
  let formatedString: string =
    count < 2
      ? formatedCount + ' ' + String
      : formatedCount + ' ' + String + 's';
  return formatedString;
};

export {
  sHight,
  sWidth,
  hS,
  vS,
  mS,
  logoutApp,
  isEmailValid,
  isPhoneValid,
  handleApiError,
  isNumberString,
  capitalizeWords,
  convertTo24Hour,
  getStringWithCount,
  getApiFormattedDate,
  formatToDropDownArray,
};
