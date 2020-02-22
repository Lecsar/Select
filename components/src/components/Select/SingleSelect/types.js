// @flow strict

import {type TGeneralSelectProps} from '../BaseSelect';

export type TSelectProps<Option> = {|
  ...TGeneralSelectProps<Option>,
  /**
   * Выбранная опция
   */
  value?: Option,
  /**
   * Начальное состояние (открыт/закрыт) выпадающий список
   */
  isInitialOpen?: boolean,
  /**
   * Наличие возможности сбросить выбранную опцию
   */
  isClearable?: boolean,
  /**
   * Коллбек, выполняемый при выборе опции
   */
  onChange: (o?: Option) => void,
|};
