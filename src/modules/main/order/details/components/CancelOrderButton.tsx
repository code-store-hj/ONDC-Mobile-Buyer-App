import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const CancelOrderButton = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const styles = makeStyles(theme.colors);
  const {orderDetails, requestingStatus, requestingTracker} = useSelector(
    ({orderReducer}) => orderReducer,
  );

  const navigateToCancelOrder = () =>
    navigation.navigate('CancelOrder', {
      domain: orderDetails.domain,
      bppId: orderDetails.bppId,
      bppUrl: orderDetails.bpp_uri,
      transactionId: orderDetails.transactionId,
      orderId: orderDetails?.id,
    });

  const allNonCancellable = !orderDetails?.items.some(
    (one: any) => one?.product['@ondc/org/cancellable'],
  );

  if (
    (orderDetails?.state === 'Accepted' || orderDetails?.state === 'Created') &&
    !allNonCancellable
  ) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={navigateToCancelOrder}
        disabled={requestingStatus || requestingTracker}>
        <Text variant={'bodyMedium'} style={styles.label}>
          Cancel Order
        </Text>
      </TouchableOpacity>
    );
  }

  return <></>;
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      borderColor: colors.error,
      borderRadius: 8,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      borderWidth: 1,
      marginTop: 24,
      marginHorizontal: 16,
      marginBottom: 20,
    },
    label: {
      color: colors.error,
    },
  });

export default CancelOrderButton;