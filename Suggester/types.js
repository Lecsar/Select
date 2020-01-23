// @flow

import {type TSelectClassNames, type TSelectProps} from '../types';

export type TSuggesterProps<Option> = {|
  ...$Diff<
    TSelectProps<Option>,
    {|
      options: Option[],
      SelectInput?: React$Element<any>,
    |}
  >,
  classNames?: {|
    ...TSelectClassNames,
    selectInputClassName?: string,
  |},
  loadOptions: (searchValue: string) => Promise<Option[]>,
  placeholder?: string,
  initialOptions?: Option[],
  debounceTime?: number,
  onChangeSearchValue?: (searchValue: string) => void,
  onClear?: () => void,
|};
