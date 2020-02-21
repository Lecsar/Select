// @flow strict

import {POSITION, type PropTypesPosition} from 'components/field/Group';
import {SIZE} from 'components/InputBase';

import {type TBaseOption} from './';

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

type TGetOptionId<T> = (option?: T) => mixed;

export const getIsSelectedOption = <T: TBaseOption>(
  currentOption: T,
  selectedOption?: T,
  getOptionId: TGetOptionId<T>
) => getOptionId(currentOption) === getOptionId(selectedOption);

export const getSelectClassNameWithModificators = ({
  position = POSITION.topLeft,
  size = SIZE.sm,
  hasError = false,
  isFocused = false,
  isReadOnly = false,
  isDisabled = false,
  prefix = false,
  postfix = false,
}: TClassNameConfig) => {
  return {
    innerWrapper: true,
    [`innerWrapper_size_${size}`]: true,
    [`innerWrapper_radius_${position}`]: true,
    innerWrapper_focused: isFocused,
    innerWrapper_error: hasError,
    innerWrapper_focused_error: hasError && isFocused,
    innerWrapper_readOnly: isReadOnly,
    innerWrapper_disabled: isDisabled,
    innerWrapper_prefix: prefix,
    innerWrapper_postfix: postfix,
  };
};
