// @flow

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
  setOptionHoverIndex = noop,
}: TOptionProps<T>) => {
  const setHoverIndex = useCallback(() => {
    if (!isHovered) {
      setOptionHoverIndex(index);
    }
  }, [index, isHovered, setOptionHoverIndex]);

  const selectOption = useCallback(
    (event: SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();
      onClick(value);
    },
    [value, onClick]
  );

  return (
    <li
      className={cx(
        'option',
        {'option--selected': isSelected},
        {'option--hovered': isHovered},
        className
      )}
      onClick={selectOption}
      onMouseOver={setHoverIndex}
    >
      {name}
    </li>
  );
};

export const Option = memo<TOptionProps<any>>(BaseOption);
