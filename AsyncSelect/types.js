// @flow

import {type TGeneralSelectProps, type TSelectClassNames} from '../BaseSelect';
import {type TLoadOptionParams, type TLoadOptionsData} from './';

export type TAsyncSelectProps<Option> = {|
  ...$Diff<
    TGeneralSelectProps<Option>,
    {|
      options: Option[],
      isLoading?: boolean,
    |}
  >,
  classNames?: {|
    ...TSelectClassNames,
    selectInputClassName?: string,
  |},
  /**
   * Информация по выбранной опции
   */
  selectedOptionData?: $Shape<Option>,
  /**
   * Функция для запроса данных об опциях
   */
  loadOptions: (loadOptionsParams: TLoadOptionParams) => Promise<TLoadOptionsData<Option>>,
  placeholder?: string,
  /**
   * Начальное состояние открыт/закрыт выпадающий список
   */
  isInitialOpen?: boolean,
  /**
   * Коллбек, выполняемый при смене опции
   */
  onChange: (option?: Option) => void,
  /**
   * Коллбек, выполняемый при изменении строки поиска
   */
  onChangeSearchValue?: (searchValue: string) => void,
  /**
   * Флаг, позволяющий искуственно добавить выбранную опцию к списку опций,
   */
  alwaysAddSelectedOption?: boolean,
  /**
   * Наличие/отсутсвие дозагрузки опции при скролле
   */
  hasInfinityScroll?: boolean,
  /**
   * Наличие/отсутсвие иконки очистки
   */
  isClearable?: boolean,
|};
