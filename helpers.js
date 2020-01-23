// @flow strict

import {POSITION, type PropTypesPosition} from 'components/field/Group';
import {SIZE} from 'components/InputBase';

import {type TBaseOption} from './Options/types';

type TGetOptionValue<T> = (option?: T) => mixed;

export const getIsSelectedOption = <T: TBaseOption>(
  currentOption: T,
  selectedOption?: T,
  getOptionValue: TGetOptionValue<T>
) => getOptionValue(currentOption) === getOptionValue(selectedOption);

type TClassNameConfig = {|
  position?: PropTypesPosition,
  size?: $Values<typeof SIZE>,
  hasError?: boolean,
  isFocused?: boolean,
  isReadOnly?: boolean,
  isDisabled?: boolean,
  prefix?: boolean,
  postfix?: boolean,
|};

export const getSelectClassNameWithModificators = (
  className: string,
  {
    position = POSITION.topLeft,
    size = SIZE.sm,
    hasError = false,
    isFocused = false,
    isReadOnly = false,
    isDisabled = false,
    prefix = false,
    postfix = false,
  }: TClassNameConfig
) => {
  return {
    [className]: true,
    [`${className}_size_${size}`]: true,
    [`${className}_focused`]: isFocused,
    [`${className}_error`]: hasError,
    [`${className}_focused_error`]: hasError && isFocused,
    [`${className}_readOnly`]: isReadOnly,
    [`${className}_disabled`]: isDisabled,
    [`${className}_prefix`]: prefix,
    [`${className}_postfix`]: postfix,

    // border-radius
    [`${className}_radius_topLeft`]: [
      POSITION.left,
      POSITION.top,
      POSITION.topLeft,
    ].includes(position),
    [`${className}_radius_topRight`]: [
      POSITION.right,
      POSITION.top,
      POSITION.topRight,
    ].includes(position),
    [`${className}_radius_bottomRight`]: [
      POSITION.right,
      POSITION.bottom,
      POSITION.bottomRight,
    ].includes(position),
    [`${className}_radius_bottomLeft`]: [
      POSITION.left,
      POSITION.bottom,
      POSITION.bottomLeft,
    ].includes(position),
  };
};
