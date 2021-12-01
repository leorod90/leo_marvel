import {Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {width, height} = Dimensions.get('screen');

const smallPadding = width * 0.025;
const bigPadding = smallPadding * 2;

let sizes = {
  iconSize: 32,
  fontSizeS: 14,
  fontSizeM: 18,
  fontSizeL: 24,
};

export default {
  WIDTH: width,
  HEIGHT: height,
  smallPadding,
  bigPadding,
  headerHeight: getStatusBarHeight(true) + 50,
  alphaHeight: 50,
  ...sizes,

  //   shadow: {
  //     shadowColor: '#000',
  //     shadowOffset: {
  //       width: 0,
  //       height: 2,
  //     },
  //     shadowOpacity: 0.25,
  //     shadowRadius: 3.84,

  //     elevation: 5,
  //   },
};
