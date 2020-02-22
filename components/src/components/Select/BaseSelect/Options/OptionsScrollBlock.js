// @flow strict

import React, {useCallback, useEffect, useMemo} from 'react';
import classNames from 'classnames/bind';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';

import {ScrollBlock} from 'components/ScrollBlock';

import {
  areOptionsEqual,
  defaultGetOptionId,
  defaultGetOptionName,
  defaultLoadingMessage,
  defaultNoOptionsMessage,
} from '../';
import {type TBaseOption, type TOptionsScrollBlockProps} from './types';
import {Option} from '.';

import style from './style.less';

const cx = classNames.bind(style);

export const OptionsScrollBlock = <T: TBaseOption>({
  classNames = {},
  value: selectedValue,
  options = [],
  optionHoverIndex,
  isLoading = false,
  showLoadingMessage = isLoading,
  loadingMessage = defaultLoadingMessage,
  noOptionsMessage = defaultNoOptionsMessage,
  scheduleUpdate,
  onSetOptionHoverIndex = noop,
  onChange = noop,
  onScrollOptionList = noop,
  getOptionId = defaultGetOptionId,
  getOptionName = defaultGetOptionName,
  optionListHeader,
  optionListFooter,
  CustomOptionComponent,
}: TOptionsScrollBlockProps<T>) => {
  useEffect(() => {
    scheduleUpdate();
  }, [options.length, scheduleUpdate]);

  const renderOption = useCallback(
    (currentOption: T, index: number) => {
      const isSelected = Array.isArray(selectedValue)
        ? selectedValue.some(selectedOption => areOptionsEqual(currentOption, selectedOption, getOptionId))
        : areOptionsEqual(currentOption, selectedValue, getOptionId);

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
      if (showLoadingMessage) {
        return renderNoOptionMessage(loadingMessage);
      }

      if (options.length === 0) {
        return renderNoOptionMessage(noOptionsMessage);
      }

      return <ul className={cx('optionList', classNames.optionList)}>{options.map(renderOption)}</ul>;
    },
    [noOptionsMessage, loadingMessage, showLoadingMessage, classNames, renderOption, renderNoOptionMessage]
  );

  const handleScroll = useMemo(() => debounce(onScrollOptionList, 150), [onScrollOptionList]);

  return (
    <ScrollBlock autoHeight autoHeightMin={0} autoHeightMax={250} autoHide onScroll={handleScroll}>
      {optionListHeader}
      {renderOptionList(options)}
      {optionListFooter}
    </ScrollBlock>
  );
};
