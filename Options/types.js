// @flow

import {type TGetOptionHandlers} from '../types';

export type TBaseOption = {
  id?: IdType,
  name?: string,
};

export type TOptionProps<T: TBaseOption> = {|
  className?: string,
  value: T,
  name: string,
  index?: number,
  isSelected?: boolean,
  isHovered?: boolean,
  onClick?: (value: T) => void,
  setOptionHoverIndex?: (index: number) => void,
|};

export type TCustomOption<Option> = (
  optionProps: TOptionProps<Option>
) => React$Element<any>;

export type TOptionClassNames = {|
  noOptionMessageText?: string,
  optionList?: string,
  optionListWrapper?: string,
  option?: string,
|};

export type TBaseSelectClassNames = {|
  wrapper?: string,
  innerWrapper?: string,
  selectText?: string,
  selectPlaceholder?: string,
|};

export type TOptionListProps<Option> = {|
  ...TGetOptionHandlers<Option>,
  classNames?: TOptionClassNames,
  value?: Option | Option[],
  options: Option[],
  optionHoverIndex: number,
  isLoading?: boolean,
  noOptionsMessage: string,
  closeMenu: () => void,
  setOptionHoverIndex: (index: number) => void,
  onChange: (o: Option) => void,
  CustomOption?: TCustomOption<Option>,
|};
