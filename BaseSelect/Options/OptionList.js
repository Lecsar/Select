// @flow strict

import React, {useCallback, useEffect, useMemo} from 'react';
import {Popper, type PopperChildrenProps} from 'react-popper';
import classNames from 'classnames/bind';
import noop from 'lodash/noop';

import ScrollBlock from 'components/ScrollBlock';

import {KEY_CODE} from 'constants/keyCodes';

import {defaultGetOptionId, defaultGetOptionName, defaultNoOptionsMessage, getIsSelectedOption} from '../';
import {getOptionListWrapperClassname} from './helpers';
import {useOnClickOutside} from './hooks';
import {type TBaseOption, type TOptionListProps} from './types';
import {Option} from '.';

import style from './style.less';

const cx = classNames.bind(style);

export const OptionList = <T: TBaseOption>({
  width = '100%',
  classNames = {},
  value: selectedValue,
  options = [],
  optionHoverIndex = -1,
  isLoading = false,
  noOptionsMessage = defaultNoOptionsMessage,
  closeMenu = noop,
  onSetOptionHoverIndex = noop,
  onChange = noop,
  getOptionId = defaultGetOptionId,
  getOptionName = defaultGetOptionName,
  optionListHeader,
  optionListFooter,
  CustomOptionComponent,
}: TOptionListProps<T>) => {
  const optionsMaxIndex = useMemo(() => options.length - 1, [options.length]);

  const setNextHoverIndex = useCallback(() => {
    const nextIndex = optionHoverIndex + 1 <= optionsMaxIndex ? optionHoverIndex + 1 : 0;
    onSetOptionHoverIndex(nextIndex);
  }, [optionHoverIndex, optionsMaxIndex, onSetOptionHoverIndex]);

  const setPrevHoverIndex = useCallback(() => {
    const nextIndex = optionHoverIndex - 1 >= 0 ? optionHoverIndex - 1 : optionsMaxIndex;
    onSetOptionHoverIndex(nextIndex);
  }, [optionHoverIndex, optionsMaxIndex, onSetOptionHoverIndex]);

  const changeSelectedOption = useCallback(() => {
    if (optionHoverIndex in options) {
      onChange(options[optionHoverIndex]);
    }
  }, [options, optionHoverIndex, onChange]);

  const handleDocumentKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // TODO: переехать на code, нативный keyCode deprecated
      switch (event.keyCode) {
        case KEY_CODE.ESC:
          closeMenu();
          break;
        case KEY_CODE.TAB:
          event.preventDefault();
          changeSelectedOption();
          break;
        case KEY_CODE.ENTER:
          changeSelectedOption();
          break;
        case KEY_CODE.ARROW_UP:
          event.preventDefault();
          setPrevHoverIndex();
          break;
        case KEY_CODE.ARROW_DOWN:
          event.preventDefault();
          setNextHoverIndex();
          break;
        default:
          break;
      }
    },
    [closeMenu, setPrevHoverIndex, setNextHoverIndex, changeSelectedOption]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleDocumentKeyDown);
    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [handleDocumentKeyDown]);

  const renderOption = useCallback(
    (currentOption: T, index: number) => {
      const isSelected = Array.isArray(selectedValue)
        ? selectedValue.some(selectedOption => getIsSelectedOption(currentOption, selectedOption, getOptionId))
        : getIsSelectedOption(currentOption, selectedValue, getOptionId);

      const generalOptionProps = {
        key: getOptionId(currentOption) || index,
        className: classNames.option,
        name: getOptionName(currentOption),
        value: currentOption,
        index,
        isSelected,
        isHovered: optionHoverIndex === index,
        onClick: onChange,
        onSetOptionHoverIndex,
      };

      if (CustomOptionComponent) {
        return <CustomOptionComponent {...generalOptionProps} />;
      }

      return <Option {...generalOptionProps} />;
    },
    [
      selectedValue,
      optionHoverIndex,
      classNames,
      onChange,
      onSetOptionHoverIndex,
      getOptionId,
      getOptionName,
      CustomOptionComponent,
    ]
  );

  const renderNoOptionMessage = useCallback(
    (message: string) => <p className={cx('noOptionMessageText', classNames.noOptionMessageText)}>{message}</p>,
    [classNames]
  );

  const renderOptionList = useCallback(
    (options: T[]) => {
      if (isLoading) {
        return renderNoOptionMessage('Загрузка...');
      }

      if (options.length === 0) {
        return renderNoOptionMessage(noOptionsMessage);
      }

      return <ul className={cx('optionList', classNames.optionList)}>{options.map(renderOption)}</ul>;
    },
    [noOptionsMessage, isLoading, classNames, renderOption, renderNoOptionMessage]
  );

  const popperRef = useOnClickOutside(closeMenu);

  return (
    <Popper innerRef={popperRef} positionFixed placement="bottom-start">
      {({placement, ref, style}: PopperChildrenProps) => (
        <div
          style={{...style, width}}
          ref={ref}
          className={cx(getOptionListWrapperClassname(placement), classNames.optionListWrapper)}
          data-placement={placement}
          data-name="selectPopup"
        >
          <ScrollBlock autoHeight autoHeightMin={0} autoHeightMax={250} autoHide>
            {optionListHeader}
            {renderOptionList(options)}
            {optionListFooter}
          </ScrollBlock>
        </div>
      )}
    </Popper>
  );
};
