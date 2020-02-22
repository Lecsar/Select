// @flow strict

import React, {memo, useCallback} from 'react';
import cn from 'classnames/bind';
import noop from 'lodash/noop';

import Icon from 'components/Icon';

import {type TBaseOption, type TOptionProps} from '../BaseSelect';

import optionStyle from '../BaseSelect/Options/style.less';
import multiOptionStyle from './style.less';

const cxOption = cn.bind(optionStyle);
const cxMulti = cn.bind(multiOptionStyle);

export const MultiOptionBase = <T: TBaseOption>({
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

  const selectOption = useCallback(() => {
    onClick(value);
  }, [value, onClick]);

  return (
    <li
      className={cn(cxOption('option', {option_hovered: isHovered}), cxMulti('option_multi'), className)}
      onClick={selectOption}
      onMouseOver={handleSetHoverIndex}
      data-name="select-option"
    >
      <div>
        <Icon className={cn(cxOption('icon'), cxMulti('doneIcon', {doneIcon_selected: isSelected}))} name="done" />
      </div>
      <p>{name}</p>
    </li>
  );
};

// $FlowFixMe
export const MultiOption = memo<TOptionProps<any>>(MultiOptionBase);
