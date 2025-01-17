import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import React, {useCallback, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getUrlParams, showToastWithGravity} from '../../../utils/utils';
import {useAppTheme} from '../../../utils/theme';

const SellerQRCode = ({navigation}: {navigation: any}) => {
  const theme = useAppTheme();
  const [torchOn, setTorchOn] = useState(false);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onQRScan = (event: any) => {
    if (event.data.startsWith('beckn://ondc')) {
      const url = event.data;
      const urlParams = getUrlParams(url);
      if (
        urlParams.hasOwnProperty('context.action') &&
        urlParams['context.action'] === 'search'
      ) {
        const brandId = `${urlParams['context.bpp_id']}_${urlParams['context.domain']}_${urlParams['message.intent.provider.id']}`;
        const pageParams: any = {brandId};
        if (
          urlParams.hasOwnProperty('message.intent.provider.locations.0.id')
        ) {
          pageParams.outletId = `${brandId}_${urlParams['message.intent.provider.locations.0.id']}`;
        }
        navigation.replace('BrandDetails', pageParams);
      } else {
        showToastWithGravity(`Context action search is missing in ${url}`);
      }
    } else {
      showToastWithGravity(`Scanned URL ${event.data}`);
    }
  };

  return (
    <>
      <QRCodeScanner
        reactivate={false}
        onRead={onQRScan}
        flashMode={
          torchOn
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        cameraStyle={styles.container}
      />
      <View style={[styles.container, styles.metaContainer]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack}>
            <Icon name={'clear'} size={24} color={theme.colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTorchOn(!torchOn)}>
            <Icon
              name={torchOn ? 'flash-off' : 'flash-on'}
              size={24}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.emptyContainer} />
          <View style={styles.cameraContainer}>
            <View style={styles.camera} />
          </View>
          <View style={styles.emptyContainer} />
        </View>
        <View style={styles.footer} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  metaContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 66,
    paddingVertical: 16,
    backgroundColor: 'rgba(0, 0,0,0.5)',
  },
  content: {
    flexDirection: 'row',
    height: 276,
  },
  footer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0,0,0.5)',
  },
  cameraContainer: {
    width: 276,
    height: 276,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: '#fff',
    padding: 18,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0,0,0.5)',
  },
  camera: {
    width: 240,
    height: 240,
    backgroundColor: 'transparent',
    borderRadius: 16,
  },
});

export default SellerQRCode;
