// @flow strict

import React from 'react';
import cn from 'classnames/bind';

import style from './style.less';

type TSelectTextProps = {|
  className?: string,
  isDisabled?: boolean,
  children?: string,
|};

const cx = cn.bind(style);

export const SelectText = ({className, isDisabled = false, children = ''}: TSelectTextProps) => (
  <p className={cx('selectText', {selectText_disabled: isDisabled}, className)}>{children}</p>
);

type TSelectPlaceholderProps = {|
  className?: string,
  children: string,
|};

export const SelectPlaceholder = ({className, children}: TSelectPlaceholderProps) => (
  <div className={cx('selectText', 'selectText_placeholder', className)}>{children}</div>
);
