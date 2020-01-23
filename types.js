// @flow

import {type PropTypesPosition} from 'components/field/Group';
import {type TSize} from 'components/InputBase';

import {
  type TBaseSelectClassNames,
  type TCustomOption,
  type TOptionClassNames,
} from './Options/types';

export type TGetOptionHandlers<Option> = {|
  getOptionKey?: (o?: Option) => IdType,
  getOptionName?: (o?: Option) => string,
  getOptionValue?: (o?: Option) => IdType,
|};

export type TSelectClassNames = {|
  select?: TBaseSelectClassNames,
  option?: TOptionClassNames,
|};

type TGeneralSelectProps<Option> = {|
  ...TGetOptionHandlers<Option>,
  classNames?: TSelectClassNames,
  options: Option[],
  size?: TSize,
  position?: PropTypesPosition,
  placeholder?: string,
  error?: string,
  isLoading?: boolean,
  isDisabled?: boolean,
  noOptionsMessage?: string,
  onClear?: (event: SyntheticEvent<HTMLElement>) => void,
  CustomOption?: TCustomOption<Option>,
  SelectInput?: React$Element<any>,
|};

export type TBaseSelectProps<Option> = {|
  ...TGeneralSelectProps<Option>,
  isOpen: boolean,
  value?: Option | Option[],
  hasDropDownIcon?: boolean,
  hasClearIcon?: boolean,
  setOpen: (isOpen: boolean) => void,
  onChange: (o: Option) => void,
|};

export type TSelectProps<Option> = {|
  ...TGeneralSelectProps<Option>,
  initialValue?: Option,
  onChange: (o?: Option) => void,
|};

export type TMultiSelectProps<Option> = {|
  ...TGeneralSelectProps<Option>,
  initialValues: Option[],
  onChange: (options: Option[]) => void,
|};
