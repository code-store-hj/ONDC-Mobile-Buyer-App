import React from 'react';
import {Button} from 'react-native-elements';
import {appStyles} from '../../styles/Styles';

//TODO: Documentation is missing
const ContainButton = props => {
  return <Button {...props} titleStyle={appStyles.container} />;
};

export default ContainButton;
