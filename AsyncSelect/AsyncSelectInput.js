// @flow strict

import React, {memo} from 'react';
import cn from 'classnames/bind';

import {SelectPlaceholder, SelectText} from '../BaseSelect/SelectElements';

import style from './style.less';

const cx = cn.bind(style);

type TProps = {|
  suggestInputClassName?: string,
  selectTextClassName?: string,
  selectPlaceholderClassName?: string,
  placeholder: string,
  searchValue: string,
  selectedOptionName: string,
  isOpen?: boolean,
  onChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
|};

const BaseAsyncSelectInput = ({
  suggestInputClassName,
  selectTextClassName,
  selectPlaceholderClassName,
  placeholder,
  searchValue,
  isOpen,
  selectedOptionName,
  onChange,
}: TProps) => {
  if (isOpen) {
    return (
      <input
        autoFocus
        className={cx('suggestInput', suggestInputClassName)}
        placeholder={placeholder}
        value={searchValue}
        onChange={onChange}
      />
    );
  }

  if (selectedOptionName) {
    return <SelectText className={selectTextClassName}>{selectedOptionName}</SelectText>;
  }

  return <SelectPlaceholder className={selectPlaceholderClassName}>{placeholder}</SelectPlaceholder>;
};

export const AsyncSelectInput = memo<TProps>(BaseAsyncSelectInput);
