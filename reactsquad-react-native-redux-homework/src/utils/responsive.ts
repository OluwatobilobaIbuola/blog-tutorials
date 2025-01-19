import { width, height } from './dimensions';

//frame sizes are based on the figma design (frame iphone 13 & 14)
const frameWidth = 390;
const frameHeight = 844;

const widthScale = (size: number) => (width / frameWidth) * size;
const heightScale = (size: number) => (height / frameHeight) * size;

const moderateWidthScale = (size: number, factor = 0.5) =>
  size + (widthScale(size) - size) * factor;

const moderateHeightScale = (size: number, factor = 0.5) =>
  size + (heightScale(size) - size) * factor;

const resolution = (size: number) => {
  let currentResolution = Math.sqrt(height * height + width * width);
  let designResolution = Math.sqrt(
    frameHeight * frameHeight + frameWidth * frameWidth,
  );
  const RESOLUTIONS_PROPORTION = currentResolution / designResolution;
  return RESOLUTIONS_PROPORTION * size;
};

export {
  widthScale as w,
  heightScale as h,
  moderateWidthScale as mw,
  moderateHeightScale as mh,
  resolution as res,
};

// horizontalScale ==> for width, marginLeft,marginRight, marginHorinzontal paddingLeft,paddingRight,paddingHorizontal, likewise
// verticalScale ==> for height, marginTop, marginBottom, marginVertical, paddingTop, paddingBottom, linHeight, likewise
import { Dimensions, Platform, PixelRatio } from 'react-native';

export var { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

// based on iPhone 8's scale
const wscale: number = SCREEN_WIDTH / 375;
const hscale: number = SCREEN_HEIGHT / 667;

export default function normalize(
  size: number,
  based: 'width' | 'height' = 'width',
) {
  const newSize = based === 'height' ? size * hscale : size * wscale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
