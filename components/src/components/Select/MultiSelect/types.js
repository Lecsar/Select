// @flow strict

import {type TGeneralSelectProps} from '../BaseSelect';

export type TMultiSelectProps<Option> = {|
  ...TGeneralSelectProps<Option>,
  /**
   * Массив выбранных опций
   */
  selectedOptions: Option[],
  /**
   * Наличие возможности сбросить выбранные опции
   */
  isClearable?: boolean,
  /**
   * Начальное состояние (открыт/закрыт) выпадающий список
   */
  isInitialOpen?: boolean,
  /**
   * Коллбек, выполняемый при выборе опции
   */
  onChange: (options: Option[]) => void,
|};
