import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setToken} from '../redux/reducer/Auth';

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth()
      .currentUser?.getIdToken(true)
      .then(idToken => {
        dispatch(setToken(idToken));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return {};
};
