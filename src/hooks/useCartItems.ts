import {API_BASE_URL, CART} from '../utils/apiActions';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef} from 'react';
import useNetworkHandling from './useNetworkHandling';
import useNetworkErrorHandling from './useNetworkErrorHandling';
import {setCartItems} from '../redux/reducer/Cart';

const CancelToken = axios.CancelToken;

export default () => {
  const {uid} = useSelector((state: any) => state.Auth);
  const dispatch = useDispatch();
  const source = useRef<any>(null);
  const {getDataWithAuth} = useNetworkHandling();
  const {handleApiError} = useNetworkErrorHandling();

  const getCartItems = async () => {
    try {
      source.current = CancelToken.source();
      const {data} = await getDataWithAuth(
        `${API_BASE_URL}${CART}/${uid}`,
        source.current.token,
      );
      dispatch(setCartItems(data));
      return data;
    } catch (error) {
      handleApiError(error);
      return [];
    }
  };

  useEffect(() => {
    return () => {
      if (source.current) {
        source?.current?.cancel();
      }
    };
  }, []);

  return {getCartItems};
};
