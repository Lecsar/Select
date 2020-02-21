// @flow strict

import {type TGetOptionHandlers} from '../types';

export type TBaseOption = {
  +id?: IdType,
  +name?: string,
};

export type TOptionProps<T: TBaseOption> = {|
  className?: string,
  value: T,
  name: string,
  index?: number,
  isSelected?: boolean,
  isHovered?: boolean,
  onClick?: (value: T) => void,
  onSetOptionHoverIndex?: (index: number) => void,
|};

export type TCustomOption<Option: TBaseOption> = React$AbstractComponent<TOptionProps<Option>, mixed>;

export type TOptionClassNames = {|
  noOptionMessageText?: string,
  optionList?: string,
  optionListWrapper?: string,
  option?: string,
|};

export type TBaseSelectClassNames = {|
  wrapper?: string,
  innerWrapper?: string,
  selectInputWrapper?: string,
  iconsWrapper?: string,
  selectText?: string,
  selectPlaceholder?: string,
|};

export type TOptionListProps<Option> = {|
  ...TGetOptionHandlers<Option>,
  width?: number | string,
  classNames?: TOptionClassNames,
  value?: Option | Option[],
  options: Option[],
  optionHoverIndex: number,
  isLoading?: boolean,
  showLoadingMessage: boolean,
  loadingMessage: string,
  noOptionsMessage: string,
  closeMenu: () => void,
  onSetOptionHoverIndex: (index: number) => void,
  onChange: (o: Option) => void,
  onScrollOptionList?: (event: SyntheticEvent<HTMLDivElement>) => void,
  optionListHeader?: React$Node,
  optionListFooter?: React$Node,
  CustomOptionComponent?: TCustomOption<Option>,
|};

export type TOptionsScrollBlockProps<T> = {|
  ...$Diff<TOptionListProps<T>, {|width?: number | string, closeMenu?: () => void|}>,
  optionHoverIndex: number,
  scheduleUpdate: () => void,
|};
