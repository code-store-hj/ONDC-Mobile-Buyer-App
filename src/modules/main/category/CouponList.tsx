import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {useAppTheme} from '../../../utils/theme';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CouponImg = require('../../../assets/Coupon.png');
const CheckBox = require('../../../assets/check.png');

interface CouponList {}

const CouponList: React.FC<CouponList> = ({}) => {
  const {t} = useTranslation();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [checkTick, setCheckTick] = useState(false);

  const theme = useAppTheme();
  const styles = makeStyles(theme.colors);

  const checkboxClick = () => {
    if (checkTick) {
      setCheckTick(false);
    } else {
      setCheckTick(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchView}>
        <TextInput
          placeholder="Please enter valid coupon code"
          style={styles.textInput}
        />
        <Text variant="bodyLarge" style={styles.applyText}>
          Apply
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.pageContainer}>
        {[{}, {}, {}, {}, {}].map((item, index) => {
          return (
            <View style={styles.itemView}>
              <TouchableOpacity
                onPress={checkboxClick}
                style={
                  checkTick
                    ? styles.checkBoxViewFillUnfill
                    : styles.checkBoxViewFill
                }>
                <Image source={CheckBox} />
              </TouchableOpacity>
              <View key={index} style={styles.cardView}>
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
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.neutral50,
    },
    searchView: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.white,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textInput: {
      flex: 1,
      height: 44,
      borderWidth: 1,
      borderRadius: 12,
      borderColor: colors.neutral200,
      paddingHorizontal: 10,
    },
    applyText: {
      color: colors.primary,
      marginLeft: 10,
    },
    pageContainer: {
      flex: 1,
      backgroundColor: colors.white,
      gap: 20,
      paddingVertical: 20,
      marginTop: 20,
    },
    itemView: {
      flexDirection: 'row',
      marginHorizontal: 20,
      alignItems: 'center',
    },
    cardView: {
      flex: 1,
      height: 64,
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 12,
      borderColor: colors.neutral100,
    },
    checkBoxViewFill: {
      height: 20,
      width: 20,
      borderWidth: 1,
      borderColor: '#979797',
      borderRadius: 6,
      marginRight: 12,
    },
    checkBoxViewFillUnfill: {
      height: 20,
      width: 20,
      borderRadius: 6,
      marginRight: 12,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
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

export default CouponList;
