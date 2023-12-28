import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import {Button, IconButton, Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import RBSheet from 'react-native-raw-bottom-sheet';
import {API_BASE_URL, CART} from '../../../../utils/apiActions';
import {
  getCustomizations,
  getPriceWithCustomisations,
} from '../../../../utils/utils';
import useNetworkHandling from '../../../../hooks/useNetworkHandling';
import FBProductCustomization from '../../provider/components/FBProductCustomization';
import {updateCartItems} from '../../../../redux/cart/actions';
import Customizations from '../../../../components/customization/Customizations';
import ManageQuantity from '../../../../components/customization/ManageQuantity';
import useUpdateSpecificItemCount from '../../../../hooks/useUpdateSpecificItemCount';

interface CartItems {
  allowScroll?: boolean;
  cartItems: any[];
  setCartItems: (items: any[]) => void;
  haveDistinctProviders: boolean;
  isProductCategoryIsDifferent: boolean;
}

const CancelToken = axios.CancelToken;
const screenHeight: number = Dimensions.get('screen').height;

const CartItems: React.FC<CartItems> = ({
  allowScroll = true,
  haveDistinctProviders,
  isProductCategoryIsDifferent,
  cartItems,
  setCartItems,
}) => {
  const {deleteDataWithAuth, getDataWithAuth, putDataWithAuth} =
    useNetworkHandling();
  const customizationSheet = useRef<any>(null);
  const source = useRef<any>(null);
  const dispatch = useDispatch();
  const {uid} = useSelector(({authReducer}) => authReducer);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const theme = useTheme();
  const styles = makeStyles(theme.colors);
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const [currentCartItem, setCurrentCartItem] = useState<any>(null);
  const [productPayload, setProductPayload] = useState<any>(null);
  const [requestedProduct, setRequestedProduct] = useState<any>(null);
  const [customizationState, setCustomizationState] = useState<any>({});
  const {updatingCartItem, updateSpecificCartItem} =
    useUpdateSpecificItemCount();

  const getProductDetails = async (productId: any) => {
    try {
      source.current = CancelToken.source();
      const {data} = await getDataWithAuth(
        `${API_BASE_URL}/protocol/item-details?id=${productId}`,
        source.current.token,
      );
      setProductPayload(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const updateCartItem = async (
    itemId: any,
    increment: boolean,
    uniqueId: any,
  ) => {
    await updateSpecificCartItem(
      itemId,
      increment,
      uniqueId,
      cartItems,
      setCartItems,
    );
  };

  const deleteCartItem = async (itemId: any) => {
    try {
      setItemToDelete(itemId);
      source.current = CancelToken.source();
      await deleteDataWithAuth(
        `${API_BASE_URL}${CART}/${uid}/${itemId}`,
        source.current.token,
      );
      const list = cartItems.filter((item: any) => item._id !== itemId);
      setCartItems(list);
      dispatch(updateCartItems(list));
    } catch (error) {
    } finally {
      setItemToDelete(null);
    }
  };

  const handleCustomiseClick = async (cartItem: any) => {
    try {
      setRequestedProduct(cartItem._id);
      setCustomizationState(cartItem.item.customisationState);
      await getProductDetails(cartItem.item.id);
      setCurrentCartItem(cartItem);
      showCustomization();
    } catch (e) {
    } finally {
      setRequestedProduct(null);
    }
  };

  const renderItems = () => {
    return cartItems?.map((cartItem: any, index: number) => (
      <View key={cartItem._id}>
        <View style={styles.product}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDetails', {
                productId: cartItem.item.id,
              })
            }>
            <FastImage
              source={{
                uri: cartItem?.item?.product?.descriptor?.symbol,
              }}
              style={styles.productImage}
            />
            {/*{renderVegNonVegTag(cartItem)}*/}
          </TouchableOpacity>
          <View style={styles.productMeta}>
            <Text variant={'bodyMedium'}>
              {cartItem?.item?.product?.descriptor?.name}
            </Text>
            <Customizations cartItem={cartItem} />
            {cartItem.item.hasCustomisations && (
              <TouchableOpacity
                disabled={!!requestedProduct}
                style={styles.customiseContainer}
                onPress={() => handleCustomiseClick(cartItem)}>
                {cartItem._id === requestedProduct ? (
                  <ActivityIndicator color={theme.colors.primary} size={14} />
                ) : (
                  <Icon
                    name={'pencil-outline'}
                    color={theme.colors.primary}
                    size={14}
                  />
                )}
                <Text variant={'labelMedium'} style={styles.customiseText}>
                  Customise
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <ManageQuantity
            allowDelete
            cartItem={cartItem}
            updatingCartItem={updatingCartItem}
            updateCartItem={updateCartItem}
            deleteCartItem={deleteCartItem}
          />

          <View>
            <Text variant="titleSmall">
              ₹{' '}
              {cartItem.item.hasCustomisations
                ? Number(getPriceWithCustomisations(cartItem)) *
                  Number(cartItem?.item?.quantity?.count)
                : Number(cartItem?.item?.product?.subtotal)}
            </Text>
            {itemToDelete === cartItem._id ? (
              <ActivityIndicator size={20} color={theme.colors.primary} />
            ) : (
              <IconButton
                icon={'delete'}
                iconColor={'#D83132'}
                onPress={() => deleteCartItem(cartItem._id)}
              />
            )}
          </View>
        </View>
        {cartItem.item.quantity.count >
          cartItem.item.product.quantity.available.count && (
          <View style={styles.infoBox}>
            <Text variant={'bodyMedium'} style={styles.infoText}>
              Only {cartItem.item.product.quantity.available.count} available
              instead of {cartItem.item.quantity.count}. Update the quantity or
              switch to another provider.
            </Text>
          </View>
        )}
        {index === cartItems.length - 1 ? (
          <>
            {haveDistinctProviders && (
              <View style={styles.errorBox}>
                <Text variant={'bodyMedium'} style={styles.errorText}>
                  You are ordering from different store. Please check your order
                  again.
                </Text>
              </View>
            )}
            {isProductCategoryIsDifferent && (
              <View style={styles.errorBox}>
                <Text variant={'bodyMedium'} style={styles.errorText}>
                  You are ordering from different category. Please check your
                  order again.
                </Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.divider} />
        )}
      </View>
    ));
  };

  const showCustomization = () => customizationSheet.current.open();

  const hideCustomization = () => customizationSheet.current.close();

  const updateCustomizations = async () => {
    const url = `${API_BASE_URL}${CART}/${uid}/${currentCartItem._id}`;
    const items = cartItems.concat([]);
    const itemIndex = items.findIndex(item => item._id === currentCartItem._id);
    if (itemIndex !== -1) {
      let updatedCartItem = items[itemIndex];
      const updatedCustomizations = await getCustomizations(
        productPayload,
        customizationState,
      );
      updatedCartItem.id = updatedCartItem.item.id;
      updatedCartItem.item.customisations = updatedCustomizations;
      updatedCartItem = updatedCartItem.item;
      updatedCartItem.customisationState = customizationState;
      source.current = CancelToken.source();
      await putDataWithAuth(url, updatedCartItem, source.current.token);
      hideCustomization();
      setCartItems(items);
    }
  };

  return (
    <>
      {allowScroll ? (
        <ScrollView style={styles.container}>{renderItems()}</ScrollView>
      ) : (
        renderItems()
      )}

      <RBSheet
        ref={customizationSheet}
        height={screenHeight - 150}
        customStyles={{
          container: styles.rbSheet,
        }}>
        <View style={styles.header}>
          <Text variant={'titleSmall'} style={styles.title}>
            Customize
          </Text>
          <IconButton icon={'close'} onPress={hideCustomization} />
        </View>
        <View style={styles.customizationContainer}>
          <FBProductCustomization
            isEditFlow
            product={productPayload}
            customizationState={customizationState}
            setCustomizationState={setCustomizationState}
            setItemOutOfStock={() => {}}
          />
        </View>

        <View style={styles.customizationButtons}>
          <Button
            style={styles.customizationButton}
            mode="outlined"
            onPress={() =>
              navigation.navigate('ProductDetails', {
                productId: productPayload.id,
              })
            }>
            View Details
          </Button>
          <View style={styles.separator} />
          <Button
            style={styles.customizationButton}
            mode="contained"
            onPress={updateCustomizations}>
            Save
          </Button>
        </View>
      </RBSheet>
    </>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 24,
      paddingHorizontal: 16,
    },
    product: {
      flexDirection: 'row',
    },
    productImage: {
      width: 48,
      height: 48,
      borderRadius: 5,
      borderColor: '#E8E8E8',
      backgroundColor: '#E8E8E8',
    },
    productMeta: {
      flex: 1,
      marginRight: 18,
      marginLeft: 12,
    },
    customiseContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 12,
    },
    customiseText: {
      color: colors.primary,
      marginLeft: 4,
    },
    infoBox: {
      backgroundColor: 'rgba(249, 197, 28, 0.17)',
      borderRadius: 6,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginTop: 20,
    },
    infoText: {
      color: colors.warning,
    },
    errorBox: {
      backgroundColor: '#FFEBEB',
      borderRadius: 6,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginTop: 20,
    },
    errorText: {
      color: '#D83232',
    },
    divider: {
      marginVertical: 20,
      width: '100%',
      height: 1,
      backgroundColor: '#CACDD8',
    },
    customizationButtons: {
      marginTop: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    customizationButton: {
      flex: 1,
    },
    separator: {
      width: 16,
    },
    customizationContainer: {
      padding: 16,
    },
    rbSheet: {borderTopLeftRadius: 15, borderTopRightRadius: 15},
    header: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: '#ababab',
      borderBottomWidth: 1,
    },
    title: {
      color: '#1A1A1A',
    },
  });

export default CartItems;