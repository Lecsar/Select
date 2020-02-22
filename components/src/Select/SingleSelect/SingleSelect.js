// @flow strict

import React, {useCallback, useState} from 'react';

import {BaseSelect, type TBaseOption} from '../BaseSelect';
import {type TSelectProps} from './types';

export const Select = <T: TBaseOption>({
  isInitialOpen = false,
  onChange,
  isClearable,
  hasDropDownIcon = true,
  ...baseSelectProps
}: TSelectProps<T>) => {
  const [isOpen, setOpen] = useState(isInitialOpen);

  const changeSelectedValue = useCallback(
    (selectedOption: T) => {
      onChange(selectedOption);
      setOpen(false);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  return (
    <BaseSelect
      {...baseSelectProps}
      isOpen={isOpen}
      onSetOpen={setOpen}
      onChange={changeSelectedValue}
      onClear={handleClear}
      hasClearIcon={isClearable}
      hasDropDownIcon={hasDropDownIcon}
    />
  );
};
