// @flow strict

import React, {useCallback, useMemo, useState} from 'react';
import classNames from 'classnames/bind';
import noop from 'lodash/noop';

import ClickOutside from 'components/ClickOutside';

import {
  defaultGetOptionKey,
  defaultGetOptionName,
  defaultGetOptionValue,
  defaultNoOptionsMessage,
} from './defaultValues';
import {OptionList} from './Options';
import {SelectIcons} from './SelectIcons';
import {type TBaseOption, type TBaseSelectProps} from './types';

import style from './style.less';

const cx = classNames.bind(style);

export const BaseSelect = <T: TBaseOption, K: mixed>({
  value: selectedValue,
  options,
  placeholder = '',
  isOpen = false,
  isLoading = false,
  isDisabled = false,
  onChange = noop,
  noOptionsMessage = defaultNoOptionsMessage,
  CustomOption,
  selectText = '',
  hasDropDownIcon = false,
  hasClearIcon = false,
  setOpen = noop,
  getOptionKey = defaultGetOptionKey,
  getOptionName = defaultGetOptionName,
  getOptionValue = defaultGetOptionValue,
  onClear = noop,
}: TBaseSelectProps<T, K>) => {
  const [optionHoverIndex, setOptionHoverIndex] = useState(0);
  const isMultiSelection = useMemo(() => Array.isArray(selectedValue), [
    selectedValue,
  ]);

  const closeMenu = useCallback(() => {
    if (!isDisabled) {
      setOpen(false);
    }
  }, [isDisabled, setOpen]);

  const toggleMenu = useCallback(() => {
    if (!isDisabled) {
      setOpen(!isOpen);
    }
  }, [isDisabled, isOpen, setOpen]);

  const changeSelectedOption = useCallback(
    (option: T) => {
      onChange(option);

      if (!isMultiSelection) {
        closeMenu();
      }
    },
    [isMultiSelection, onChange, closeMenu]
  );

  const getMultiSelectText = useCallback(
    (selectedOptions: Array<T>) => {
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

  const getSelectText = useCallback(() => {
    if (selectText) {
      return selectText;
    }

    if (Array.isArray(selectedValue)) {
      return getMultiSelectText(selectedValue);
    }

    return getOptionName(selectedValue);
  }, [selectText, selectedValue, getOptionName, getMultiSelectText]);

  const renderSelectText = useCallback(
    (selectText: string) => (
      <div className={cx('selectText', {'selectText--disabled': isDisabled})}>
        {selectText}
      </div>
    ),
    [isDisabled]
  );

  const renderSelectPlaceholder = useCallback(
    () => <div className={cx('selectPlaceholder')}>{placeholder}</div>,
    [placeholder]
  );

  return (
    <ClickOutside onClickOutside={closeMenu}>
      <div className={cx('wrapper')} onClick={toggleMenu}>
        <div
          className={cx(
            'innerWrapper',
            {'innerWrapper--open': isOpen},
            {'innerWrapper--disabled': isDisabled}
          )}
        >
          {getSelectText()
            ? renderSelectText(getSelectText())
            : renderSelectPlaceholder()}

          <SelectIcons
            isOpen={isOpen}
            isLoading={isLoading}
            isDisabled={isDisabled}
            hasClearIcon={hasClearIcon}
            hasDropDownIcon={hasDropDownIcon}
            onClear={onClear}
          />
        </div>

        {isOpen && (
          <OptionList
            value={selectedValue}
            options={options}
            isLoading={isLoading}
            optionHoverIndex={optionHoverIndex}
            noOptionsMessage={noOptionsMessage}
            CustomOption={CustomOption}
            onChange={changeSelectedOption}
            closeMenu={closeMenu}
            setOptionHoverIndex={setOptionHoverIndex}
            getOptionKey={getOptionKey}
            getOptionName={getOptionName}
            getOptionValue={getOptionValue}
          />
        )}
      </div>
    </ClickOutside>
  );
};
