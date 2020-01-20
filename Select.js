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
import {type TBaseOption, type TSelectProps} from './types';

export const Select = <T: TBaseOption, K>({
  initialValue,
  options,
  placeholder = '',
  isDisabled = false,
  noOptionsMessage = defaultNoOptionsMessage,
  CustomOption,
  onChange = noop,
  getOptionKey = defaultGetOptionKey,
  getOptionName = defaultGetOptionName,
  getOptionValue = defaultGetOptionValue,
  onClear = noop,
}: TSelectProps<T, K>) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const changeSelectedValue = useCallback(
    (selectedOption: T) => {
      if (!isDisabled) {
        onChange(selectedOption);
        setSelectedValue(selectedOption);
      }
    },
    [isDisabled, onChange]
  );

  return (
    <BaseSelect
      placeholder={placeholder}
      isOpen={isOpen}
      isDisabled={isDisabled}
      value={selectedValue}
      options={options}
      noOptionsMessage={noOptionsMessage}
      CustomOption={CustomOption}
      setOpen={setOpen}
      onChange={changeSelectedValue}
      getOptionKey={getOptionKey}
      getOptionName={getOptionName}
      getOptionValue={getOptionValue}
      onClear={onClear}
      hasDropDownIcon
    />
  );
};
