import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import useNetworkHandling from '../../../../../hooks/useNetworkHandling';
import {API_BASE_URL, PROVIDERS} from '../../../../../utils/apiActions';
import {skeletonList} from '../../../../../utils/utils';
import useNetworkErrorHandling from '../../../../../hooks/useNetworkErrorHandling';
import {FB_DOMAIN} from '../../../../../utils/constants';

const CancelToken = axios.CancelToken;

const BrandSkeleton = () => {
  const theme = useTheme();
  const styles = makeStyles(theme.colors);
  return (
    <View style={styles.brand}>
      <SkeletonPlaceholder>
        <View style={styles.brandSkeleton} />
      </SkeletonPlaceholder>
    </View>
  );
};

const NoImageAvailable = require('../../../../../assets/noImage.png');

const TopBrands = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const source = useRef<any>(null);
  const theme = useTheme();
  const styles = makeStyles(theme.colors);
  const [providers, setProviders] = useState<any[]>([]);
  const [apiRequested, setApiRequested] = useState<boolean>(true);
  const {getDataWithAuth} = useNetworkHandling();
  const {handleApiError} = useNetworkErrorHandling();

  const getAllProviders = async () => {
    try {
      setApiRequested(true);
      source.current = CancelToken.source();
      const {data} = await getDataWithAuth(
        `${API_BASE_URL}${PROVIDERS}`,
        source.current.token,
      );
      setProviders(data.response.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setApiRequested(false);
    }
  };

  const navigateToBrandDetails = (provider: any) => {
    if (provider.domain === FB_DOMAIN) {
      navigation.navigate('Outlets', {brandId: provider.id});
    } else {
      navigation.navigate('BrandDetails', {brandId: provider.id});
    }
  };

  useEffect(() => {
    getAllProviders().then(() => {});

    return () => {
      if (source.current) {
        source.current.cancel();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text variant={'titleSmall'} style={styles.title}>
        All Providers
      </Text>
      {apiRequested ? (
        <FlatList
          horizontal
          data={skeletonList}
          renderItem={() => <BrandSkeleton />}
          keyExtractor={item => item.id}
        />
      ) : (
        <FlatList
          horizontal
          data={providers}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.brand}
              onPress={() => navigateToBrandDetails(item)}>
              <FastImage
                source={
                  item?.descriptor?.symbol
                    ? {uri: item?.descriptor?.symbol}
                    : NoImageAvailable
                }
                style={styles.brandImage}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      paddingTop: 40,
      paddingHorizontal: 16,
    },
    title: {
      marginBottom: 12,
    },
    brand: {
      width: 109,
      height: 109,
      marginRight: 15,
      borderRadius: 12,
      backgroundColor: '#F5F5F5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    brandSkeleton: {
      width: 109,
      height: 109,
    },
    brandImage: {
      width: 100,
      height: 100,
    },
  });
export default TopBrands;
