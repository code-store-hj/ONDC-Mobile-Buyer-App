import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {logoutUser} from '../reduxFile/auth/actions';
import {clearAllData} from '../reduxFile/actions';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const clearDataAndLogout = () => {
    logoutUser(dispatch);
    dispatch(clearAllData());

    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return {clearDataAndLogout};
};
