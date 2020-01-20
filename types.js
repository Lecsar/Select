// @flow

export type TBaseOption = {
  id: IdType,
  name: string,
};

export type TOptionProps<T: TBaseOption> = {|
  value: T,
  name: string,
  index?: number,
  isSelected?: boolean,
  isHovered?: boolean,
  onClick?: (value: T) => void,
  setOptionHoverIndex?: (index: number) => void,
|};

export type TGetOptionHandlers<Option, OptionValue> = {|
  getOptionKey?: (o?: Option) => IdType,
  getOptionName?: (o?: Option) => string,
  getOptionValue?: (o?: Option) => OptionValue,
|};

type TCustomOption<Option> = (
  optionProps: TOptionProps<Option>
) => React$Element<any>;

export type TOptionListProps<Option, OptionValue> = {|
  ...TGetOptionHandlers<Option, OptionValue>,
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

export type TBaseSelectProps<Option, OptionValue> = {|
  ...TGetOptionHandlers<Option, OptionValue>,
  options: Option[],
  isOpen: boolean,
  value: Option | Option[],
  placeholder?: string,
  isLoading?: boolean,
  isDisabled?: boolean,
  noOptionsMessage?: string,
  selectText?: string,
  hasDropDownIcon?: boolean,
  hasClearIcon?: boolean,
  setOpen: (isOpen: boolean) => void,
  onChange: (o: Option) => void,
  onClear?: (event: SyntheticEvent<HTMLElement>) => void,
  CustomOption?: TCustomOption<Option>,
|};

export type TSelectProps<Option, OptionValue> = {|
  ...TGetOptionHandlers<Option, OptionValue>,
  initialValue: Option,
  options: Option[],
  placeholder?: string,
  isDisabled?: boolean,
  noOptionsMessage?: string,
  onChange: (o?: Option) => void,
  onClear?: (event: SyntheticEvent<HTMLElement>) => void,
  CustomOption?: TCustomOption<Option>,
|};

export type TMultiSelectProps<Option, OptionValue> = {|
  ...TGetOptionHandlers<Option, OptionValue>,
  initialValues: Option[],
  options: Option[],
  placeholder?: string,
  isDisabled?: boolean,
  noOptionsMessage?: string,
  onChange: (options: Option[]) => void,
  onClear?: (event: SyntheticEvent<HTMLElement>) => void,
  CustomOption?: TCustomOption<Option>,
|};
