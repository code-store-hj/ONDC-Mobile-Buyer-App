import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, withTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {getStoredData} from '../../../../../utils/storage';
import { useDispatch } from "react-redux";
import { saveLatLong } from "../../../../../redux/location/action";

interface AddressTag {
  theme: any;
}

const AddressTag: React.FC<AddressTag> = ({theme}) => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState<any>(null);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const styles = makeStyles(theme.colors);

  const getAddress = async () => {
    const addressResponse = await getStoredData('address');
    if (addressResponse) {
      let object = JSON.parse(addressResponse);
      setAddress(object);
      dispatch(saveLatLong(object?.address?.lat, object?.address?.lng));
    }
  };

  useEffect(() => {
    getAddress().then(() => {});
  }, []);

  if (address) {
    return (
      <TouchableOpacity
        style={styles.addressContainer}
        onPress={() => navigation.navigate('AddressList')}>
        <Icon name={'map-marker-alt'} color={'#fff'} size={20} />
        <Text variant={'bodySmall'} style={styles.deliverTo}>
          Deliver to
        </Text>
        <Text variant={'bodyMedium'} style={styles.address}>
          {address?.address?.areaCode
            ? address?.address?.areaCode
            : address?.address?.city}
        </Text>
        <Icon name={'chevron-down'} color={'#fff'} />
      </TouchableOpacity>
    );
  } else {
    return <ActivityIndicator size={'small'} color={'#fff'} />;
  }
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    deliverTo: {
      marginHorizontal: 8,
      color: '#fff',
      fontWeight: '400',
    },
    address: {
      marginEnd: 8,
      color: '#fff',
      fontWeight: '500',
    },
  });

export default withTheme(AddressTag);