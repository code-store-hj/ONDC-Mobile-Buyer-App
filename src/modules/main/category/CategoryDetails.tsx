import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Categories from './components/Categories';
import Header from '../dashboard/components/header/Header';
import SubCategories from './components/SubCategories';
import StoresNearMe from './components/StoresNearMe';
import {appStyles} from '../../../styles/styles';
import Page from '../../../components/page/Page';
import Offers from '../category/components/Offers';

interface CategoryDetails {
  route: any;
}

const CategoryDetails: React.FC<CategoryDetails> = ({route: {params}}) => {
  return (
    <Page>
      <View style={[appStyles.container, styles.container]}>
        <Header />
        <ScrollView style={appStyles.container}>
          <Categories currentCategory={params.category} />
          <SubCategories currentCategory={params.category} />
          <Offers />
          <StoresNearMe domain={params.domain} />
        </ScrollView>
      </View>
    </Page>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
});

export default CategoryDetails;
