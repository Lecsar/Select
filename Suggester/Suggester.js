// @flow strict

import React, {useCallback, useEffect, useRef, useState} from 'react';
import cn from 'classnames/bind';
import noop from 'lodash/noop';

import {defaultGetOptionName, defaultGetOptionValue} from '../defaultValues';
import {type TBaseOption} from '../Options/types';
import {useAsyncSearchOptions, useInitialSettingSelectedOption} from './hooks';
import {SuggestInput} from './SuggestInput';
import {type TSuggesterProps} from './types';
import {BaseSelect} from '..';

import style from './style.less';

const cx = cn.bind(style);

export const Suggester = <T: TBaseOption>({
  classNames = {},
  loadOptions,
  placeholder = 'Начните вводить ...',
  initialValue,
  onChangeSearchValue = noop,
  initialOptions = [],
  debounceTime = 500,
  getOptionName = defaultGetOptionName,
  getOptionValue = defaultGetOptionValue,
  onChange = noop,
  onClear = noop,
  ...props
}: TSuggesterProps<T>) => {
  const {selectInputClassName, ...baseSelectClassNames} = classNames;

  const [isOpen, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T | void>(undefined);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const changeSelectOpen = useCallback((isOpen: boolean) => {
    if (!isOpen) {
      setSearchValue('');
    }
    setOpen(isOpen);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const {options, isLoading} = useAsyncSearchOptions({
    loadOptions,
    searchValue,
    debounceTime,
    initialOptions,
  });

  useInitialSettingSelectedOption({
    initialValue,
    options,
    getOptionValue,
    setSelectedOption,
  });

  const changeSearchValue = useCallback(
    ({target: {value}}: SyntheticInputEvent<HTMLInputElement>) => {
      onChangeSearchValue(value);
      setSearchValue(value);
    },
    [onChangeSearchValue]
  );

  const changeSelectedOption = useCallback(
    (option: T) => {
      onChange(option);
      setSelectedOption(option);
    },
    [onChange]
  );

  const clearSuggester = useCallback(() => {
    setSelectedOption(undefined);
    setSearchValue('');
    onClear();
  }, [onClear]);

  const renderSuggestInput = useCallback(
    (placeholder: string) => (
      <SuggestInput
        className={selectInputClassName}
        searchInputRef={searchInputRef}
        placeholder={placeholder}
        value={searchValue}
        onChange={changeSearchValue}
      />
    ),
    [selectInputClassName, searchValue, changeSearchValue]
  );

  const getSelectInput = useCallback(() => {
    const selectedOptionName = getOptionName(selectedOption);

    if (isOpen) {
      return renderSuggestInput(selectedOptionName || placeholder);
    }

    if (selectedOptionName) {
      return <span>{selectedOptionName}</span>;
    }

    return <span className={cx('placeholder')}>{placeholder}</span>;
  }, [renderSuggestInput, placeholder, isOpen, selectedOption, getOptionName]);

  return (
    <BaseSelect
      {...props}
      classNames={baseSelectClassNames}
      isOpen={isOpen}
      setOpen={changeSelectOpen}
      value={selectedOption}
      options={options}
      isLoading={isLoading}
      SelectInput={getSelectInput()}
      onChange={changeSelectedOption}
      getOptionName={getOptionName}
      getOptionValue={getOptionValue}
      onClear={clearSuggester}
      hasClearIcon={!!(getOptionName(selectedOption) || searchValue)}
    />
  );
};
