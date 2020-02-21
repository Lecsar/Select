// @flow strict

import React, {memo, useCallback} from 'react';
import classNames from 'classnames/bind';
import noop from 'lodash/noop';

import {type TBaseOption, type TOptionProps} from './types';

import style from './style.less';

const cx = classNames.bind(style);

const BaseOption = <T: TBaseOption>({
  className,
  name,
  value,
  index = -1,
  isSelected,
  isHovered = false,
  onClick = noop,
  onSetOptionHoverIndex = noop,
}: TOptionProps<T>) => {
  const handleSetHoverIndex = useCallback(() => {
    if (!isHovered) {
      onSetOptionHoverIndex(index);
    }
  }, [index, isHovered, onSetOptionHoverIndex]);

  const handleSelectOption = useCallback(() => {
    onClick(value);
  }, [value, onClick]);

  return (
    <li
      className={cx('option', {option_selected: isSelected}, {option_hovered: isHovered}, className)}
      onClick={handleSelectOption}
      onMouseOver={handleSetHoverIndex}
      data-name="select-option"
    >
      {name}
    </li>
  );
};

// $FlowFixMe
export const Option = memo<TOptionProps<any>>(BaseOption);
