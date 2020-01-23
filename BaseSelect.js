// @flow strict

import React, {useCallback, useMemo, useState} from 'react';
import cn from 'classnames/bind';
import noop from 'lodash/noop';

import ClickOutside from 'components/ClickOutside';
import {SIZE} from 'components/InputBase';

import {
  defaultGetOptionKey,
  defaultGetOptionName,
  defaultGetOptionValue,
  defaultNoOptionsMessage,
} from './defaultValues';
import {getSelectClassNameWithModificators} from './helpers';
import {OptionList} from './Options';
import {type TBaseOption} from './Options/types';
import {SelectIcons} from './SelectIcons';
import {type TBaseSelectProps} from './types';

import style from './style.less';

const cx = cn.bind(style);

export const BaseSelect = <T: TBaseOption>({
  classNames = {},
  value: selectedValue,
  options,
  placeholder = '',
  error = '',
  isOpen = false,
  isLoading = false,
  isDisabled = false,
  onChange = noop,
  noOptionsMessage = defaultNoOptionsMessage,
  position,
  size = SIZE.sm,
  CustomOption,
  SelectInput,
  hasDropDownIcon = false,
  hasClearIcon = false,
  setOpen = noop,
  getOptionKey = defaultGetOptionKey,
  getOptionName = defaultGetOptionName,
  getOptionValue = defaultGetOptionValue,
  onClear = noop,
}: TBaseSelectProps<T>) => {
  const {select: selectCn = {}, option: optionCn} = classNames;

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

  const getSelectText = useCallback(
    () =>
      Array.isArray(selectedValue)
        ? getMultiSelectText(selectedValue)
        : getOptionName(selectedValue),
    [selectedValue, getOptionName, getMultiSelectText]
  );

  const renderSelectText = useCallback(
    (selectText: string) => (
      <p
        className={cx(
          'selectText',
          {'selectText--disabled': isDisabled},
          selectCn.selectText
        )}
      >
        {selectText}
      </p>
    ),
    [isDisabled, selectCn]
  );

  const renderSelectPlaceholder = useCallback(
    () => (
      <div className={cx('selectPlaceholder', selectCn.selectPlaceholder)}>
        {placeholder}
      </div>
    ),
    [placeholder, selectCn]
  );

  const renderSelectInput = useCallback(() => {
    if (SelectInput) {
      return SelectInput;
    }

    const selectText = getSelectText();

    return selectText
      ? renderSelectText(selectText)
      : renderSelectPlaceholder();
  }, [SelectInput, getSelectText, renderSelectText, renderSelectPlaceholder]);

  const innerWrapperModificators = {
    position,
    size,
    isDisabled,
    isFocused: isOpen,
    hasError: Boolean(error),
  };

  return (
    <ClickOutside onClickOutside={closeMenu}>
      <div className={cx('wrapper', selectCn.wrapper)} onClick={toggleMenu}>
        <div
          className={cx(
            getSelectClassNameWithModificators(
              'innerWrapper',
              innerWrapperModificators
            ),
            selectCn.innerWrapper
          )}
        >
          <div className={cx('selectInputWrapper')}>{renderSelectInput()}</div>

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
            classNames={optionCn}
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
