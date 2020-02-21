// @flow strict

import React, {useCallback, useState} from 'react';
import noop from 'lodash/noop';

import {SIZE} from 'components/InputBase';

import {
  BaseSelect,
  type TBaseOption,
  defaultGetOptionId,
  defaultGetOptionName,
  defaultNoOptionsMessage,
  getIsSelectedOption,
} from '../BaseSelect';
import {SelectPlaceholder, SelectText} from '../BaseSelect/SelectElements';
import {MultiOption} from './MultiOption';
import {type TMultiSelectProps} from './types';

export const MultiSelect = <T: TBaseOption>({
  tabIndex = 0,
  classNames = {},
  maxOptionListWidth,
  options,
  selectedOptions = [],
  isInitialOpen = false,
  placeholder = '',
  error = '',
  isClearable = false,
  isLoading = false,
  isDisabled = false,
  hasDropDownIcon = true,
  noOptionsMessage = defaultNoOptionsMessage,
  position,
  size = SIZE.sm,
  onChange,
  onFocus = noop,
  onBlur = noop,
  customSelectInput,
  optionListHeader,
  optionListFooter,
  CustomOptionComponent,
  getOptionId = defaultGetOptionId,
  getOptionName = defaultGetOptionName,
}: TMultiSelectProps<T>) => {
  const [isOpen, setOpen] = useState(isInitialOpen);

  const changeSelectedOptions = useCallback(
    (selectedOption: T) => {
      const hasInSelectedOptions = selectedOptions.some(option =>
        getIsSelectedOption(option, selectedOption, getOptionId)
      );

      const newSelectedOptions: T[] = hasInSelectedOptions
        ? selectedOptions.filter(option => !getIsSelectedOption(option, selectedOption, getOptionId))
        : [...selectedOptions, selectedOption];

      onChange(newSelectedOptions);
    },
    [selectedOptions, onChange, getOptionId]
  );

  const clearOptions = useCallback(
    (event: SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();
      onChange([]);
    },
    [onChange]
  );

  const getMultiSelectText = useCallback(
    (selectedOptions: T[]) => {
      switch (selectedOptions.length) {
        case 0:
          return '';
        case 1:
          return getOptionName(selectedOptions[0]);
        default:
          return `Выбрано (${selectedOptions.length})`;
      }
    },
    [getOptionName]
  );

  const renderSelectInput = useCallback(() => {
    const selectText = getMultiSelectText(selectedOptions);

    return selectText ? (
      <SelectText isDisabled={isDisabled}>{selectText}</SelectText>
    ) : (
      <SelectPlaceholder>{placeholder}</SelectPlaceholder>
    );
  }, [selectedOptions, isDisabled, placeholder, getMultiSelectText]);

  return (
    <BaseSelect
      tabIndex={tabIndex}
      classNames={classNames}
      maxOptionListWidth={maxOptionListWidth}
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
      customSelectInput={customSelectInput || renderSelectInput()}
      optionListHeader={optionListHeader}
      optionListFooter={optionListFooter}
      CustomOptionComponent={CustomOptionComponent || MultiOption}
      onSetOpen={setOpen}
      onChange={changeSelectedOptions}
      onFocus={onFocus}
      onBlur={onBlur}
      getOptionId={getOptionId}
      getOptionName={getOptionName}
      onClear={clearOptions}
      hasClearIcon={isClearable && Boolean(selectedOptions.length)}
      hasDropDownIcon={hasDropDownIcon}
    />
  );
};
