import { StyleSheet, Text, TextInput } from 'react-native';
import React from 'react';

import { TextInputProps } from 'react-native';
import { h } from '../../../utils/responsive';
import { COLORS, SIZES } from '../../../styles/theme';

interface TextInputCompProps extends TextInputProps {
  style?: object;
  labelProps?: object;
  labelTxt?: string;
}

export const TextInputComponent: React.FC<TextInputCompProps> = ({
  labelTxt,
  labelProps,
  ...otherProps
}) => {
  return (
    <>
      {!labelTxt ? null : (
        <Text style={styles.inputLabel} {...labelProps}>
          {labelTxt}
        </Text>
      )}
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.inputPlaceholderTxt}
        {...otherProps}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: h(48),
    width: '100%',
    fontSize: h(14),

    borderWidth: 1,
    borderRadius: SIZES.br_8,

    padding: 12,
    borderColor: COLORS.inputBorder,
    color: COLORS.inputTxt,
    backgroundColor: COLORS.inputBg,
  },
  inputLabel: {
    fontSize: h(14),

    color: COLORS.inputLabelTxt,
    marginBottom: h(6),
  },
});
