// @flow strict

import {type TBaseOption} from './types';

type TGetOptionValue<T> = (option?: T) => mixed;

export const getIsSelectedOption = <T: TBaseOption>(
  currentOption: T,
  selectedOption?: T,
  getOptionValue: TGetOptionValue<T>
) => getOptionValue(currentOption) === getOptionValue(selectedOption);
