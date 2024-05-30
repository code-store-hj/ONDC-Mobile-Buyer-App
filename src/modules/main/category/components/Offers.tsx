import React from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import {useAppTheme} from '../../../../utils/theme';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native-paper';

const Man = require('../../../../assets/man.png');

interface Offers {}

const Offers: React.FC<Offers> = ({}) => {
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
          <LinearGradient
            start={{x: 0.5, y: 1}}
            end={{x: 1, y: 0.1}}
            colors={['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#008ECC']}
            style={styles.cardView}>
            <View style={styles.leftView}>
              <Text variant="labelSmall" style={styles.title}>
                H&M
              </Text>
              <Text variant="headlineSmall">flat 10% off</Text>
              <View style={styles.buttonView}>
                <Text variant="labelMedium" style={styles.buttonText}>
                  Order Now
                </Text>
              </View>
            </View>
            <View style={styles.rightView}>
              <Image source={Man} />
            </View>
          </LinearGradient>
        );
      })}
    </ScrollView>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginTop: 12,
      paddingHorizontal: 20,
      gap: 20,
    },
    cardView: {
      height: 104,
      width: 212,
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 16,
      borderColor: colors.neutral100,
    },
    title: {
      fontWeight: '400',
    },
    buttonView: {
      height: 22,
      width: 69,
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderRadius: 7,
      justifyContent: 'center',
    },
    buttonText: {
      color: colors.white,
    },
    leftView: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 16,
      gap: 8,
    },
    rightView: {
      flex: 0.8,
      justifyContent: 'center',
    },
  });

export default Offers;
