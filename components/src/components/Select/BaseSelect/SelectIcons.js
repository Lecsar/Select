// @flow strict

import React, {useCallback} from 'react';
import classNames from 'classnames/bind';
import noop from 'lodash/noop';

import Icon from '../../../components/Icon';
import Spinner from '../../../components/Spinner';

import style from './style.less';

const cx = classNames.bind(style);

type TSelectIconsProps = {|
  isOpen?: boolean,
  isLoading?: boolean,
  isDisabled?: boolean,
  hasClearIcon?: boolean,
  hasDropDownIcon?: boolean,
  onClear?: (event: SyntheticEvent<HTMLElement>) => void,
|};

export const SelectIcons = ({
  isOpen = false,
  isLoading = false,
  isDisabled = false,
  hasClearIcon = false,
  hasDropDownIcon = false,
  onClear = noop,
}: TSelectIconsProps) => {
  const handleClear = useCallback(
    (event: SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();

      if (!isDisabled) {
        onClear(event);
      }
    },
    [isDisabled, onClear]
  );

  if (isLoading) {
    return <Spinner className={cx('spinner')} size="sm" />;
  }

  return (
    <>
      {hasClearIcon && <Icon className={cx('icon', {icon_disabled: isDisabled})} name="clear" onClick={handleClear} />}
      {hasDropDownIcon && (
        <Icon
          className={cx('icon', {icon_disabled: isDisabled})}
          name={isOpen ? 'select-arrow-up' : 'select-arrow-dn'}
        />
      )}
    </>
  );
};
