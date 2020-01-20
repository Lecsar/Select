// @flow strict

import React, {useCallback, useState} from 'react';
import noop from 'lodash/noop';

import {BaseSelect} from './BaseSelect';
import {
  defaultGetOptionKey,
  defaultGetOptionName,
  defaultGetOptionValue,
  defaultNoOptionsMessage,
} from './defaultValues';
import {getIsSelectedOption} from './helpers';
import {type TBaseOption, type TMultiSelectProps} from './types';

export const MultiSelect = <T: TBaseOption, K>({
  initialValues = [],
  options,
  placeholder = '',
  isDisabled = false,
  noOptionsMessage = defaultNoOptionsMessage,
  onChange,
  getOptionKey = defaultGetOptionKey,
  getOptionName = defaultGetOptionName,
  getOptionValue = defaultGetOptionValue,
  onClear = noop,
  CustomOption,
}: TMultiSelectProps<T, K>) => {
  const [selectedOptions, setSelectedOptions] = useState(initialValues);
  const [isOpen, setOpen] = useState(false);

  const changeSelectedOptions = useCallback(
    (selectedOption: T) => {
      if (isDisabled) {
        return;
      }

      const hasInSelectedOptions = selectedOptions.some(option =>
        getIsSelectedOption(option, selectedOption, getOptionValue)
      );

      const newSelectedOptions: T[] = hasInSelectedOptions
        ? selectedOptions.filter(
            option =>
              !getIsSelectedOption(option, selectedOption, getOptionValue)
          )
        : [...selectedOptions, selectedOption];

      setSelectedOptions(newSelectedOptions);
      onChange(newSelectedOptions);
    },
    [selectedOptions, isDisabled, onChange, getOptionValue]
  );

  const clearOptions = useCallback(
    (event: SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();
      setSelectedOptions([]);
      onClear(event);
    },
    [onClear]
  );

  return (
    <BaseSelect
      isOpen={isOpen}
      isDisabled={isDisabled}
      value={selectedOptions}
      options={options}
      placeholder={placeholder}
      noOptionsMessage={noOptionsMessage}
      CustomOption={CustomOption}
      setOpen={setOpen}
      onChange={changeSelectedOptions}
      getOptionKey={getOptionKey}
      getOptionName={getOptionName}
      getOptionValue={getOptionValue}
      onClear={clearOptions}
      hasClearIcon={Boolean(selectedOptions.length)}
      hasDropDownIcon
    />
  );
};
