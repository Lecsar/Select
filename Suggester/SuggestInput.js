// @flow strict

import React from 'react';
import cn from 'classnames/bind';

import style from './style.less';

const cx = cn.bind(style);

type InputRef = {|
  current: HTMLInputElement | null,
|};

type TSuggestInputProps = {|
  className?: string,
  searchInputRef: InputRef,
  placeholder: string,
  value: string,
  onChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
|};

export const SuggestInput = ({
  className,
  searchInputRef,
  placeholder,
  value,
  onChange,
}: TSuggestInputProps) => {
  return (
    <input
      className={cx('SuggestInput', className)}
      ref={searchInputRef}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
