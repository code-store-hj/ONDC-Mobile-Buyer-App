import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {setLogoutUser} from '../redux/reducer/Auth';
import {setclearAllData} from '../redux/reducer/Cart';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const clearDataAndLogout = () => {
    dispatch(setLogoutUser())
    dispatch(setclearAllData());

    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return {clearDataAndLogout};
};
