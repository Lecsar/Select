// @flow

import React, {memo, useCallback} from 'react';
import classNames from 'classnames/bind';
import noop from 'lodash/noop';

import Icon from 'components/Icon';

import {type TBaseOption, type TOptionProps} from './types';

import style from './style.less';

const cx = classNames.bind(style);

const MultiOptionBase = <T: TBaseOption>({
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
        'option--multi',
        {'option--hovered': isHovered},
        className
      )}
      onClick={selectOption}
      onMouseOver={setHoverIndex}
    >
      <div>
        <Icon
          className={cx('icon', 'doneIcon', {'doneIcon--selected': isSelected})}
          name="done"
        />
      </div>

      <p>{name}</p>
    </li>
  );
};

export const MultiOption = memo<TOptionProps<any>>(MultiOptionBase);
