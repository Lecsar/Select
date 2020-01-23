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
import {type TBaseOption} from './Options/types';
import {type TSelectProps} from './types';

export const Select = <T: TBaseOption>({
  classNames = {},
  initialValue,
  options,
  placeholder = '',
  error = '',
  isLoading = false,
  isDisabled = false,
  noOptionsMessage = defaultNoOptionsMessage,
  position,
  size = SIZE.sm,
  SelectInput,
  CustomOption,
  onChange = noop,
  getOptionKey = defaultGetOptionKey,
  getOptionName = defaultGetOptionName,
  getOptionValue = defaultGetOptionValue,
  onClear = noop,
}: TSelectProps<T>) => {
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

  console.log(selectedValue);

  return (
    <BaseSelect
      classNames={classNames}
      placeholder={placeholder}
      isOpen={isOpen}
      isLoading={isLoading}
      isDisabled={isDisabled}
      value={selectedValue}
      options={options}
      error={error}
      noOptionsMessage={noOptionsMessage}
      position={position}
      size={size}
      CustomOption={CustomOption}
      SelectInput={SelectInput}
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
