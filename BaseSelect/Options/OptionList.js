// @flow strict

import React, {useCallback, useEffect, useMemo} from 'react';
import {Popper, type PopperChildrenProps} from 'react-popper';
import classNames from 'classnames/bind';
import noop from 'lodash/noop';

import {KEY_CODE} from 'constants/keyCodes';

import {defaultGetOptionId, defaultGetOptionName, defaultLoadingMessage, defaultNoOptionsMessage} from '../';
import {getOptionListWrapperClassname} from './helpers';
import {useOnClickOutside} from './hooks';
import {OptionsScrollBlock} from './OptionsScrollBlock';
import {type TBaseOption, type TOptionListProps} from './types';

import style from './style.less';

const cx = classNames.bind(style);

export const OptionList = <T: TBaseOption>({
  width = '100%',
  classNames = {},
  value,
  options = [],
  optionHoverIndex = -1,
  isLoading = false,
  showLoadingMessage = isLoading,
  loadingMessage = defaultLoadingMessage,
  noOptionsMessage = defaultNoOptionsMessage,
  closeMenu = noop,
  onSetOptionHoverIndex = noop,
  onChange = noop,
  onScrollOptionList = noop,
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

  const popperRef = useOnClickOutside(closeMenu);

  return (
    <Popper innerRef={popperRef} positionFixed placement="bottom-start">
      {({placement, ref, style, scheduleUpdate}: PopperChildrenProps) => (
        <div
          style={{...style, width}}
          ref={ref}
          className={cx(getOptionListWrapperClassname(placement), classNames.optionListWrapper)}
          data-placement={placement}
          data-name="selectPopup"
        >
          <OptionsScrollBlock
            scheduleUpdate={scheduleUpdate}
            classNames={classNames}
            value={value}
            options={options}
            optionHoverIndex={optionHoverIndex}
            isLoading={isLoading}
            showLoadingMessage={showLoadingMessage}
            loadingMessage={loadingMessage}
            noOptionsMessage={noOptionsMessage}
            onSetOptionHoverIndex={onSetOptionHoverIndex}
            onChange={onChange}
            onScrollOptionList={onScrollOptionList}
            getOptionId={getOptionId}
            getOptionName={getOptionName}
            optionListHeader={optionListHeader}
            optionListFooter={optionListFooter}
            CustomOptionComponent={CustomOptionComponent}
          />
        </div>
      )}
    </Popper>
  );
};
