// @flow strict

import React, {useCallback} from 'react';
import classNames from 'classnames/bind';
import noop from 'lodash/noop';

import Icon from 'components/Icon';
import Spinner from 'components/Spinner';

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
  const onClickClear = useCallback(
    (event: SyntheticEvent<HTMLElement>) => {
      if (!isDisabled) {
        onClear(event);
      }
    },
    [isDisabled, onClear]
  );

  const renderIcons = useCallback(() => {
    if (isLoading) {
      return <Spinner className={cx('spinner')} size="sm" />;
    }

    const icons = [];

    if (hasClearIcon) {
      icons.push(
        <Icon
          key="clear"
          className={cx('icon', {'icon--disabled': isDisabled})}
          name="clear"
          onClick={onClickClear}
        />
      );
    }

    if (hasDropDownIcon) {
      icons.push(
        <Icon
          key="arrow"
          className={cx('icon', {'icon--disabled': isDisabled})}
          name={isOpen ? 'select-arrow-up' : 'select-arrow-dn'}
        />
      );
    }

    return icons;
  }, [
    isLoading,
    hasClearIcon,
    hasDropDownIcon,
    isOpen,
    isDisabled,
    onClickClear,
  ]);

  return <div className={cx('iconsWrapper')}>{renderIcons()}</div>;
};
