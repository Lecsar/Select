// @flow strict

import noop from 'lodash/noop';

import {type TBaseOption, type TGetOptionHandlers, areOptionsEqual} from '../../BaseSelect';

type TAddSelectedOptionParams<T> = {|
  ...TGetOptionHandlers<T>,
  selectedOptionData: $Shape<T>,
  options: T[],
|};

export const addSelectedToOptions = <T: TBaseOption>({
  getOptionId = noop,
  getOptionName = noop,
  selectedOptionData,
  options,
}: TAddSelectedOptionParams<T>): T[] => {
  const hasSelectedInOptions = options.find(option => areOptionsEqual(option, selectedOptionData, getOptionId));
  const hasOptionName = !!getOptionName(selectedOptionData);

  if (hasSelectedInOptions || !hasOptionName) {
    return options;
  }

  return [selectedOptionData, ...options];
};
