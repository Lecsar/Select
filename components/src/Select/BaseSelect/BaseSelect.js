// @flow strict

import React, {useCallback, useState} from 'react';
import {Manager, Reference} from 'react-popper';
import cn from 'classnames/bind';
import noop from 'lodash/noop';

import {SIZE} from 'components/InputBase';

import {KEY_CODE} from 'constants/keyCodes';

import {
  defaultGetOptionId,
  defaultGetOptionName,
  defaultLoadingMessage,
  defaultNoOptionsMessage,
} from './defaultValues';
import {getSelectClassNameWithModificators} from './helpers';
import {useElementWidth} from './hooks';
import {OptionList, type TBaseOption} from './Options';
import {SelectPlaceholder, SelectText} from './SelectElements';
import {SelectIcons} from './SelectIcons';
import {type TBaseSelectProps} from './types';

import style from './style.less';

const cx = cn.bind(style);

type TReferenceProps = {
  ref: {
    current: HTMLDivElement | null,
  },
};

export const BaseSelect = <T: TBaseOption>({
  tabIndex = 0,
  classNames = {},
  maxOptionListWidth,
  value: selectedValue,
  options,
  placeholder = '',
  error = false,
  isOpen = false,
  isLoading = false,
  isDisabled = false,
  showLoadingMessage = isLoading,
  onChange = noop,
  onBlur = noop,
  onFocus = noop,
  onScrollOptionList = noop,
  loadingMessage = defaultLoadingMessage,
  noOptionsMessage = defaultNoOptionsMessage,
  position,
  size = SIZE.sm,
  customSelectInput,
  optionListHeader,
  optionListFooter,
  CustomOptionComponent,
  hasDropDownIcon = false,
  hasClearIcon = false,
  onSetOpen = noop,
  getOptionId = defaultGetOptionId,
  getOptionName = defaultGetOptionName,
  onClear = noop,
}: TBaseSelectProps<T>) => {
  const {select: selectCn = {}, option: optionCn} = classNames;

  const [optionHoverIndex, setOptionHoverIndex] = useState(0);

  const openMenu = useCallback(() => {
    if (!isDisabled) {
      onSetOpen(true);
    }
  }, [isDisabled, onSetOpen]);

  const closeMenu = useCallback(() => {
    if (!isDisabled) {
      onSetOpen(false);
      setOptionHoverIndex(0);
    }
  }, [isDisabled, onSetOpen]);

  const handleSelectKeyDown = useCallback(
    ({keyCode}: SyntheticKeyboardEvent<HTMLElement>) => {
      if (!isOpen && keyCode === KEY_CODE.ENTER) {
        openMenu();
      }
    },
    [openMenu, isOpen]
  );

  const changeSelectedOption = useCallback(
    (option: T) => {
      if (!isDisabled) {
        onChange(option);
      }
    },
    [isDisabled, onChange]
  );

  const renderSelectInput = useCallback(() => {
    const selectText = Array.isArray(selectedValue) ? getOptionName(selectedValue[0]) : getOptionName(selectedValue);

    return selectText ? (
      <SelectText className={selectCn.selectText} isDisabled={isDisabled}>
        {selectText}
      </SelectText>
    ) : (
      <SelectPlaceholder className={selectCn.selectPlaceholder}>{placeholder}</SelectPlaceholder>
    );
  }, [selectedValue, isDisabled, placeholder, selectCn, getOptionName]);

  const innerWrapperModifiers = {
    position,
    size,
    isDisabled,
    isFocused: isOpen,
    hasError: Boolean(error),
  };

  const {ref, width: selectWidth} = useElementWidth();

  return (
    <Manager>
      <div ref={ref} className={cx('wrapper', selectCn.wrapper)}>
        <Reference>
          {({ref}: TReferenceProps) => (
            <div
              tabIndex={isDisabled ? -1 : tabIndex}
              ref={ref}
              className={cx(getSelectClassNameWithModificators(innerWrapperModifiers), selectCn.innerWrapper)}
              onClick={openMenu}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={handleSelectKeyDown}
            >
              <div className={cx('selectInputWrapper', selectCn.selectInputWrapper)}>
                {customSelectInput || renderSelectInput()}
              </div>

              <div className={cx('iconsWrapper', selectCn.iconsWrapper)}>
                <SelectIcons
                  isOpen={isOpen}
                  isLoading={isLoading}
                  isDisabled={isDisabled}
                  hasClearIcon={hasClearIcon}
                  hasDropDownIcon={hasDropDownIcon}
                  onClear={onClear}
                />
              </div>
            </div>
          )}
        </Reference>

        {isOpen && (
          <OptionList
            width={maxOptionListWidth || selectWidth}
            classNames={optionCn}
            value={selectedValue}
            options={options}
            isLoading={isLoading}
            showLoadingMessage={showLoadingMessage}
            optionHoverIndex={optionHoverIndex}
            loadingMessage={loadingMessage}
            noOptionsMessage={noOptionsMessage}
            optionListHeader={optionListHeader}
            optionListFooter={optionListFooter}
            CustomOptionComponent={CustomOptionComponent}
            onChange={changeSelectedOption}
            onScrollOptionList={onScrollOptionList}
            closeMenu={closeMenu}
            onSetOptionHoverIndex={setOptionHoverIndex}
            getOptionId={getOptionId}
            getOptionName={getOptionName}
          />
        )}
      </div>
    </Manager>
  );
};
