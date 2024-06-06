import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {clearAllData} from '../reduxFile/actions';
import {alertWithOneButton} from '../utils/alerts';
import {showToastWithGravity} from '../utils/utils';
import {logoutUser} from '../reduxFile/auth/actions';

let sessionExpiredMessageShown = false;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const clearDataAndLogout = () => {
    logoutUser(dispatch);
    dispatch(clearAllData());

    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const handleApiError = (error, setError = null) => {
    console.log(error);
    if (error.code !== 'ERR_CANCELED') {
      if (error.response) {
        if (error.response.status === 401) {
          if (!sessionExpiredMessageShown) {
            sessionExpiredMessageShown = true;
            alertWithOneButton(
              'Session Expired',
              'Session expired, please login again to continue',
              'Logout',
              () => {
                sessionExpiredMessageShown = false;
                clearDataAndLogout();
              },
            );
          }
        } else if (error.response.status === 426) {
          alertWithOneButton(
            'Version mismatch',
            'Please upgrade your application to the latest version',
            'Ok',
            () => {},
          );
        } else {
          if (setError !== null) {
            setError(error.response.data);
          } else {
            showToastWithGravity(error.response.data.error.message);
          }
        }
      } else if (error.request) {
        if (setError !== null) {
          setError(
            'Internet connection not available. Please check internet connection.',
          );
        } else {
          showToastWithGravity(
            'Internet connection not available. Please check internet connection.',
          );
        }
      } else {
        if (setError !== null) {
          setError('Something went wrong, please try again after some time.');
        } else {
          showToastWithGravity(
            'Something went wrong, please try again after some time.',
          );
        }
      }
    }
  };

  return {handleApiError};
};
