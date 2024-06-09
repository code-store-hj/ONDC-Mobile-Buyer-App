import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppTheme} from '../../../../utils/theme';
import {useTranslation} from 'react-i18next';
import StarRating from 'react-native-star-rating-widget';

const RateOrder = ({navigation}: {navigation: any}) => {
  const [rating, setRating] = useState(0);

  const {t} = useTranslation();
  const theme = useAppTheme();
  const styles = makeStyles(theme.colors);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-back'} size={20} color={theme.colors.neutral400} />
        </TouchableOpacity>
        <Text variant={'titleLarge'} style={styles.pageTitle}>
          {t('Rate Order.Rate Your Order')}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pageContent}>
          {/* Card-1 */}
          <View style={styles.cardMainView}>
            <View style={styles.cardHeader}>
              <Text variant="labelLarge" style={styles.cardHeaderText}>
                Rate Your Overall Order
              </Text>
              <EntypoIcon
                name={'chevron-down'}
                size={20}
                color={theme.colors.neutral300}
              />
            </View>
            <View style={styles.line}></View>
            <Text variant="titleLarge" style={styles.textline}>
              ONDC-139812-918371
            </Text>
            <View style={styles.starView}>
              <StarRating
                rating={rating}
                onChange={setRating}
                starSize={22}
                color={theme.colors.warning600}
                emptyColor={theme.colors.neutral200}
                enableHalfStar={false}
              />
            </View>
          </View>
          {/* Card-2 */}
          <View style={styles.cardMainView}>
            <View style={styles.cardHeader}>
              <Text variant="labelLarge" style={styles.cardHeaderText}>
                Rate Your Seller
              </Text>
              <EntypoIcon
                name={'chevron-down'}
                size={20}
                color={theme.colors.neutral300}
              />
            </View>
            <View style={styles.line}></View>
            <View style={styles.cardMidView}>
              <Image
                style={styles.jackImage}
                source={require('../../../../assets/payment/Jack.png')}
              />
              <Text variant="headlineSmall" style={styles.textline2}>
                Jack & Jones
              </Text>
            </View>

            <Text variant="labelMedium" style={styles.textlineBottom2}>
              SCO 123-B Bangalore, India
            </Text>
            <View style={styles.starView}>
              <StarRating
                rating={rating}
                onChange={setRating}
                starSize={22}
                color={theme.colors.warning600}
                emptyColor={theme.colors.neutral200}
                enableHalfStar={false}
              />
            </View>
          </View>
          {/* Card-3 */}
          {[{}, {}].map(() => {
            return (
              <View style={styles.cardMainView}>
                <View style={styles.cardHeader}>
                  <Text variant="labelLarge" style={styles.cardHeaderText}>
                    Rate Your Items
                  </Text>
                  <EntypoIcon
                    name={'chevron-down'}
                    size={20}
                    color={theme.colors.neutral300}
                  />
                </View>
                <View style={styles.line}></View>
                {[{}, {}, {}].map(() => {
                  return (
                    <>
                      <View style={styles.itemView}>
                        <Image
                          style={styles.itemImage}
                          source={require('../../../../assets/subCategories/fashion/BoysFootwear.png')}
                        />
                        <View style={styles.rightView}>
                          <Text variant="labelMedium" style={styles.itemText}>
                            Green t-shirt
                          </Text>
                          <View style={styles.itemStar}>
                            <StarRating
                              rating={rating}
                              onChange={setRating}
                              starSize={22}
                              color={theme.colors.warning600}
                              emptyColor={theme.colors.neutral200}
                              enableHalfStar={false}
                            />
                          </View>
                        </View>
                      </View>
                      <View style={styles.line} />
                    </>
                  );
                })}
                <Text variant="labelLarge">Rate Your Delivery Agent</Text>

                <Text variant="bodyLarge" style={styles.itemText2}>
                  Sidharth Pandey
                </Text>
                <View style={styles.itemStar2}>
                  <StarRating
                    rating={rating}
                    onChange={setRating}
                    starSize={22}
                    color={theme.colors.warning600}
                    emptyColor={theme.colors.neutral200}
                    enableHalfStar={false}
                  />
                </View>
                <View style={styles.line}></View>
                <Text variant="labelLarge">Rate Your Delivery Experience</Text>

                <View style={styles.itemStar2}>
                  <StarRating
                    rating={rating}
                    onChange={setRating}
                    starSize={22}
                    color={theme.colors.warning600}
                    emptyColor={theme.colors.neutral200}
                    enableHalfStar={false}
                  />
                </View>
                <View style={styles.line}></View>
              </View>
            );
          })}
          <View style={styles.bottomButton}>
            <Text variant="bodyLarge" style={styles.buttonText}>
              Submit
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    pageContainer: {
      flex: 1,
      backgroundColor: colors.white,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    pageTitle: {
      marginLeft: 20,
      color: colors.neutral400,
    },
    pageContent: {
      backgroundColor: colors.neutral50,
      padding: 16,
      flex: 1,
      gap: 16,
    },
    cardMainView: {
      backgroundColor: colors.white,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.neutral100,
      padding: 16,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardHeaderText: {
      flex: 1,
      color: colors.black,
    },
    line: {
      height: 1,
      backgroundColor: colors.neutral100,
      marginVertical: 12,
    },
    itemView: {
      flexDirection: 'row',
    },
    itemImage: {
      height: 44,
      width: 44,
      borderRadius: 7,
    },
    rightView: {},
    itemText: {
      marginLeft: 10,
    },
    itemStar: {
      flex: 1,
      justifyContent: 'flex-end',
      marginLeft: 3,
    },
    itemText2: {
      marginTop: 12,
    },
    itemStar2: {
      marginLeft: -6,
      marginTop: 5,
    },
    textline: {
      color: colors.neutral300,
      textAlign: 'center',
    },
    textline2: {
      color: colors.neutral400,
      marginLeft: 8,
    },
    textlineBottom2: {
      color: colors.neutral400,
      marginTop: 8,
    },
    cardMidView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    jackImage: {
      height: 29,
      width: 30,
    },
    starView: {
      alignItems: 'center',
      marginTop: 12,
    },
    bottomButton: {
      height: 44,
      backgroundColor: colors.primary,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:20,
    },
    buttonText: {
      color: colors.white,
    },
  });

export default RateOrder;
