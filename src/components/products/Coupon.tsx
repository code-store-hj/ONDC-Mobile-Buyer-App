import React from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {useAppTheme} from '../../utils/theme';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native-paper';

const CouponImg = require('../../assets/Coupon.png');

interface Offers {}

const Coupon: React.FC<Offers> = ({}) => {
  const {t} = useTranslation();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const theme = useAppTheme();
  const styles = makeStyles(theme.colors);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}>
      {[{}, {}, {}].map(() => {
        return (
          <View style={styles.cardView}>
            <View style={styles.leftView}>
              <Image source={CouponImg} />
            </View>
            <View style={styles.rightView}>
              <Text variant="titleLarge">FLAT 50% OFF</Text>
              <Text variant="labelSmall" style={styles.title}>
                Use code kotak50
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginTop: 24,
      paddingHorizontal: 20,
      gap: 20,
    },
    cardView: {
      height: 64,
      width: 264,
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 12,
      borderColor: colors.neutral100,
    },
    title: {
      fontWeight: '400',
    },
    leftView: {
      height: 64,
      width: 64,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary50,
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
    },
    rightView: {
      flex: 0.8,
      justifyContent: 'center',
      paddingLeft: 12,
      gap: 2,
    },
  });

export default Coupon;
