// @flow strict

import React, {useCallback, useState} from 'react';
import noop from 'lodash/noop';

import {SIZE} from 'components/InputBase';

import {BaseSelect} from './BaseSelect';
import {
  defaultGetOptionKey,
  defaultGetOptionName,
  defaultGetOptionValue,
  defaultNoOptionsMessage,
} from './defaultValues';
import {getIsSelectedOption} from './helpers';
import {type TBaseOption} from './Options/types';
import {type TMultiSelectProps} from './types';

export const MultiSelect = <T: TBaseOption>({
  classNames = {},
  initialValues = [],
  options,
  placeholder = '',
  error = '',
  isLoading = false,
  isDisabled = false,
  noOptionsMessage = defaultNoOptionsMessage,
  position,
  size = SIZE.sm,
  onChange,
  CustomOption,
  SelectInput,
  getOptionKey = defaultGetOptionKey,
  getOptionName = defaultGetOptionName,
  getOptionValue = defaultGetOptionValue,
  onClear = noop,
}: TMultiSelectProps<T>) => {
  const [selectedOptions, setSelectedOptions] = useState(initialValues);
  const [isOpen, setOpen] = useState(true);

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
      classNames={classNames}
      isOpen={isOpen}
      isLoading={isLoading}
      isDisabled={isDisabled}
      value={selectedOptions}
      options={options}
      placeholder={placeholder}
      error={error}
      noOptionsMessage={noOptionsMessage}
      position={position}
      size={size}
      CustomOption={CustomOption}
      SelectInput={SelectInput}
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
