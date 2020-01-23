// @flow strict

import React, {useCallback, useEffect, useMemo} from 'react';
import classNames from 'classnames/bind';
import noop from 'lodash/noop';

import {
  ARROW_DOWN_KEY_CODE,
  ARROW_UP_KEY_CODE,
  ENTER_KEY_CODE,
  ESCAPE_KEY_CODE,
} from '../const';
import {
  defaultGetOptionKey,
  defaultGetOptionName,
  defaultGetOptionValue,
  defaultNoOptionsMessage,
} from '../defaultValues';
import {getIsSelectedOption} from '../helpers';
import {Option} from './';
import {MultiOption} from './MultiOption';
import {type TBaseOption, type TOptionListProps} from './types';

import style from './style.less';

const cx = classNames.bind(style);

export const OptionList = <T: TBaseOption>({
  classNames = {},
  value: selectedValue,
  options = [],
  optionHoverIndex = -1,
  isLoading = false,
  noOptionsMessage = defaultNoOptionsMessage,
  closeMenu = noop,
  setOptionHoverIndex = noop,
  onChange = noop,
  getOptionKey = defaultGetOptionKey,
  getOptionName = defaultGetOptionName,
  getOptionValue = defaultGetOptionValue,
  CustomOption,
}: TOptionListProps<T>) => {
  const optionsMaxIndex = useMemo(() => options.length - 1, [options.length]);

  const setNextHoverIndex = useCallback(() => {
    const nextIndex =
      optionHoverIndex + 1 <= optionsMaxIndex ? optionHoverIndex + 1 : 0;
    setOptionHoverIndex(nextIndex);
  }, [optionHoverIndex, optionsMaxIndex, setOptionHoverIndex]);

  const setPrevHoverIndex = useCallback(() => {
    const nextIndex =
      optionHoverIndex - 1 >= 0 ? optionHoverIndex - 1 : optionsMaxIndex;
    setOptionHoverIndex(nextIndex);
  }, [optionHoverIndex, optionsMaxIndex, setOptionHoverIndex]);

  const changeSelectedOption = useCallback(() => {
    onChange(options[optionHoverIndex]);
  }, [options, optionHoverIndex, onChange]);

  const documentOnKeyDown = useCallback(
    (event: SyntheticKeyboardEvent<HTMLElement>) => {
      switch (event.keyCode) {
        case ESCAPE_KEY_CODE:
          closeMenu();
          break;
        case ENTER_KEY_CODE:
          changeSelectedOption();
          break;
        case ARROW_UP_KEY_CODE:
          setPrevHoverIndex();
          break;
        case ARROW_DOWN_KEY_CODE:
          setNextHoverIndex();
          break;
        default:
          break;
      }
    },
    [closeMenu, setPrevHoverIndex, setNextHoverIndex, changeSelectedOption]
  );

  useEffect(() => {
    document.addEventListener('keydown', documentOnKeyDown);
    return () => {
      document.removeEventListener('keydown', documentOnKeyDown);
    };
  }, [documentOnKeyDown]);

  const renderOption = useCallback(
    (currentOption: T, index: number) => {
      const isSelected = Array.isArray(selectedValue)
        ? selectedValue.some(selectedOption =>
            getIsSelectedOption(currentOption, selectedOption, getOptionValue)
          )
        : getIsSelectedOption(currentOption, selectedValue, getOptionValue);

      const generalOptionProps = {
        key: getOptionKey(currentOption),
        className: classNames.option,
        name: getOptionName(currentOption),
        value: currentOption,
        index,
        isSelected,
        isHovered: optionHoverIndex === index,
        onClick: onChange,
        setOptionHoverIndex,
      };

      if (CustomOption) {
        return <CustomOption {...generalOptionProps} />;
      }

      if (Array.isArray(selectedValue)) {
        return <MultiOption {...generalOptionProps} />;
      }

      return <Option {...generalOptionProps} />;
    },
    [
      selectedValue,
      optionHoverIndex,
      classNames,
      onChange,
      setOptionHoverIndex,
      getOptionKey,
      getOptionName,
      getOptionValue,
      CustomOption,
    ]
  );

  const renderNoOptionMessage = useCallback(
    (message: string) => (
      <p className={cx('noOptionMessageText', classNames.noOptionMessageText)}>
        {message}
      </p>
    ),
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

      return (
        <ul className={cx('optionList', classNames.optionList)}>
          {options.map(renderOption)}
        </ul>
      );
    },
    [
      noOptionsMessage,
      isLoading,
      classNames,
      renderOption,
      renderNoOptionMessage,
    ]
  );

  return (
    <div className={cx('optionListWrapper', classNames.optionListWrapper)}>
      {renderOptionList(options)}
    </div>
  );
};
