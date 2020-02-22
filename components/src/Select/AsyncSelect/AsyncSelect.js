// @flow strict

import React, {useCallback, useState} from 'react';
import noop from 'lodash/noop';

import {
  BaseSelect,
  type TBaseOption,
  areOptionsEqual,
  defaultGetOptionId,
  defaultGetOptionName,
  defaultNoOptionsMessage,
} from '../BaseSelect';
import {AsyncSelectFooter} from './AsyncSelectFooter';
import {AsyncSelectInput} from './AsyncSelectInput';
import {addSelectedToOptions, isScrolledToBottom} from './helpers';
import {useSearchLoadData} from './hooks';
import {type TAsyncSelectProps} from './types';

export const AsyncSelect = <T: TBaseOption>({
  classNames = {},
  loadOptions,
  selectedOptionData,
  placeholder = 'Начните вводить ...',
  onChangeSearchValue = noop,
  isInitialOpen = false,
  alwaysAddSelectedOption = false,
  hasInfinityScroll = false,
  noOptionsMessage = defaultNoOptionsMessage,
  isClearable = false,
  getOptionId = defaultGetOptionId,
  getOptionName = defaultGetOptionName,
  onChange = noop,
  customSelectInput,
  ...baseSelectProps
}: TAsyncSelectProps<T>) => {
  const {selectInputClassName, ...otherClassNames} = classNames;

  const [isOpen, setOpen] = useState(isInitialOpen);
  const [searchValue, setSearchValue] = useState('');

  const changeSelectOpen = useCallback((isOpen: boolean) => {
    if (!isOpen) {
      setSearchValue('');
    }
    setOpen(isOpen);
  }, []);

  const changeSearchValue = useCallback(
    ({target: {value}}: SyntheticInputEvent<HTMLInputElement>) => {
      onChangeSearchValue(value);
      setSearchValue(value);
    },
    [onChangeSearchValue]
  );

  const handleChange = useCallback(
    (selectedOption: T) => {
      setOpen(false);
      setSearchValue('');
      onChange(selectedOption);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    setSearchValue('');
    onChange();
  }, [onChange]);

  const {options, isLoading, total, loadMoreOptions} = useSearchLoadData({
    loadOptions,
    searchValue,
  });

  const handleLoadMoreOptions = useCallback(
    (event: SyntheticEvent<HTMLDivElement>) => {
      if (hasInfinityScroll && isScrolledToBottom(event)) {
        loadMoreOptions();
      }
    },
    [hasInfinityScroll, loadMoreOptions]
  );

  const patchedOptions =
    alwaysAddSelectedOption && selectedOptionData && !searchValue
      ? addSelectedToOptions({getOptionId, getOptionName, options, selectedOptionData})
      : options;

  const selectedOption: T | void = patchedOptions.find(option =>
    areOptionsEqual(option, selectedOptionData, getOptionId)
  );

  const selectedOptionName = getOptionName(selectedOption);

  const selectInput = customSelectInput || (
    <AsyncSelectInput
      suggestInputClassName={selectInputClassName}
      selectTextClassName={otherClassNames.select?.selectText}
      selectPlaceholderClassName={otherClassNames.select?.selectPlaceholder}
      isOpen={isOpen}
      selectedOptionName={selectedOptionName}
      placeholder={selectedOptionName || placeholder}
      searchValue={searchValue}
      onChange={changeSearchValue}
    />
  );

  const hasFooter = isLoading || (options.length !== 0 && total > options.length);

  const optionListFooter = hasFooter && (
    <AsyncSelectFooter
      optionsLength={options.length}
      total={total}
      isLoading={isLoading}
      hasInfinityScroll={hasInfinityScroll}
    />
  );

  const hasClearIcon = isClearable && !!(getOptionName(selectedOption) || searchValue);

  return (
    <BaseSelect
      {...baseSelectProps}
      classNames={otherClassNames}
      isOpen={isOpen}
      onSetOpen={changeSelectOpen}
      value={selectedOption}
      options={patchedOptions}
      isLoading={isLoading}
      showLoadingMessage={false}
      noOptionsMessage={isLoading ? '' : noOptionsMessage}
      customSelectInput={selectInput}
      onChange={handleChange}
      onScrollOptionList={handleLoadMoreOptions}
      getOptionId={getOptionId}
      getOptionName={getOptionName}
      onClear={handleClear}
      hasClearIcon={hasClearIcon}
      optionListFooter={optionListFooter}
    />
  );
};
