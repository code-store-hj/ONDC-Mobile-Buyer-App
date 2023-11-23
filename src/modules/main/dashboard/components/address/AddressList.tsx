import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, IconButton, withTheme} from 'react-native-paper';
import axios from 'axios';

import useNetworkErrorHandling from '../../../../../hooks/useNetworkErrorHandling';
import Address from './Address';
import {getStoredData, setStoredData} from '../../../../../utils/storage';
import {skeletonList} from '../../../../../utils/utils';
import AddressSkeleton from './AddressSkeleton';
import {appStyles} from '../../../../../styles/styles';
import useRefreshToken from '../../../../../hooks/useRefreshToken';
import useNetworkHandling from '../../../../../hooks/useNetworkHandling';
import {API_BASE_URL, DELIVERY_ADDRESS} from '../../../../../utils/apiActions';

interface Address {
  _id: string;
  userId: string;
  id: string;
  descriptor: {
    name: string;
    phone: string;
    email: string;
  };
  defaultAddress: boolean;
  address: {
    door: string;
    name: string | null;
    building: string | null;
    street: string | null;
    locality: string | null;
    ward: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    areaCode: string | null;
    tag: string | null;
    lat: string | null;
    lng: string | null;
  };
}

interface AddressList {
  navigation: any;
  theme: any;
  route: any;
}

const CancelToken = axios.CancelToken;
const AddressList: React.FC<AddressList> = ({
  navigation,
  theme,
  route: {params},
}) => {
  const source = useRef<any>(null);
  const {} = useRefreshToken();
  const {getDataWithAuth} = useNetworkHandling();
  const {handleApiError} = useNetworkErrorHandling();
  const [apiInProgress, setApiInProgress] = useState<boolean>(true);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

  /**
   * function to get list of address from server
   * @returns {Promise<void>}
   */
  const getAddressList = async () => {
    try {
      setApiInProgress(true);
      source.current = CancelToken.source();
      const {data} = await getDataWithAuth(
        `${API_BASE_URL}${DELIVERY_ADDRESS}`,
        source.current.token,
      );
      setAddresses(data);
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 404) {
          setAddresses([]);
        } else {
          handleApiError(error);
        }
      } else {
        handleApiError(error);
      }
    } finally {
      setApiInProgress(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          size={24}
          icon={'plus-circle'}
          iconColor={theme.colors.primary}
          onPress={() =>
            navigation.navigate('AddDefaultAddress', {setDefault: false})
          }
        />
      ),
    });

    const unsubscribeFocus = navigation.addListener('focus', () => {
      getAddressList()
        .then(() => {})
        .catch(() => {});
    });

    return () => {
      if (source.current) {
        source.current.cancel();
      }
      unsubscribeFocus();
    };
  }, [navigation]);

  useEffect(() => {
    getStoredData('address').then(response => {
      if (response) {
        setCurrentAddress(JSON.parse(response));
      }
    });
  }, []);

  const onAddressSelect = async (item: any) => {
    setCurrentAddress(item);
  };

  const onNextButtonClick = async () => {
    await setStoredData('address', JSON.stringify(currentAddress));
    navigation.navigate(params.navigateToNext);
  };

  const renderItem = ({item}) => {
    const isSelected = currentAddress?.id === item?.id;
    return item.hasOwnProperty('isSkeleton') ? (
      <AddressSkeleton />
    ) : (
      <Address
        item={item}
        isCurrentAddress={isSelected}
        params={params}
        onAddressSelect={onAddressSelect}
      />
    );
  };

  const list = apiInProgress ? skeletonList : addresses;

  return (
    <View style={appStyles.container}>
      <FlatList
        style={appStyles.container}
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => (
          <View style={[appStyles.container, appStyles.centerContainer]}>
            <Button
              labelStyle={appStyles.containedButtonLabel}
              contentStyle={appStyles.containedButtonContainer}
              mode="outlined"
              onPress={() => navigation.navigate('AddDefaultAddress')}>
              Add Address
            </Button>
          </View>
        )}
        contentContainerStyle={
          list.length > 0 ? styles.contentContainerStyle : appStyles.container
        }
      />
      {params?.navigateToNext && (
        <View style={styles.buttonContainer}>
          <Button
            labelStyle={appStyles.containedButtonLabel}
            contentStyle={appStyles.containedButtonContainer}
            mode="contained"
            onPress={onNextButtonClick}>
            Next
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginVertical: 16,
  },
  buttonContainer: {
    width: 300,
    marginVertical: 10,
    alignSelf: 'center',
  },
  contentContainerStyle: {
    paddingBottom: 16,
  },
});

export default withTheme(AddressList);