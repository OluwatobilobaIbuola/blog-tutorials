import {View} from 'react-native';
import React from 'react';

import {ViewProps} from 'react-native';

interface ViewCompProps extends ViewProps {}

export default function ViewComponent({
  style,
  children,
  ...otherProps
}: ViewCompProps) {
  return (
    <View style={style} {...otherProps}>
      {children}
    </View>
  );
}
