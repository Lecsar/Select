// @flow strict

import {type PropTypesPosition} from 'components/field/Group';
import {type TSize} from 'components/InputBase';

import {type TBaseSelectClassNames, type TCustomOption, type TOptionClassNames} from '.';

export type TGetOptionKey<Option> = (o?: Option) => IdType;
export type TGetOptionName<Option> = (o?: Option) => string;

export type TGetOptionHandlers<Option> = {|
  /**
   * Коллбек для получения id опций, используется при проставлении React key
   * и сравнения опций (выбрана ли текущая опция)
   */
  getOptionId?: TGetOptionKey<Option>,
  /**
   * Коллбек для получения имени опции
   */
  getOptionName?: TGetOptionName<Option>,
|};

export type TSelectClassNames = {|
  select?: TBaseSelectClassNames,
  option?: TOptionClassNames,
|};

export type TGeneralSelectProps<Option> = {|
  ...TGetOptionHandlers<Option>,
  tabIndex?: number,
  classNames?: TSelectClassNames,
  /**
   * Максимальная ширина выпадающего списка,
   * по умолчанию равна ширине селекта
   */
  maxOptionListWidth?: number | string,
  options: Option[],
  /**
   * Размер (высота) селекта sm, nm, lg
   */
  size?: TSize,
  /**
   * Позиция селекта, необходима для закругления
   * определенных границ в зависимости от позиции
   */
  position?: PropTypesPosition,
  placeholder?: string,
  /**
   * Текст ошибки
   */
  error?: boolean,
  /**
   * Наличие индикатора загрузки
   */
  isLoading?: boolean,
  /**
   * Заблокирован/разблокирован селект
   */
  isDisabled?: boolean,
  /**
   * Показывать / не показывать сообщение о загрузке
   */
  showLoadingMessage?: boolean,
  /**
   * Наличие иконки стрелочка вниз (вверх)
   */

  hasDropDownIcon?: boolean,
  /**
   * Сообщение, отображаемое, когда происходит загрузка
   */
  loadingMessage?: string,
  /**
   * Сообщение, отображаемое, когда в селекте нет опций
   */
  noOptionsMessage?: string,
  /**
   * Коллбек, выполняемый при фокусе выпадающего списка
   */
  onFocus?: (event?: SyntheticEvent<HTMLElement>) => void,
  /**
   * Коллбек, выполняемый при блёре (закрытии) выпадающего списка
   */
  onBlur?: (event?: SyntheticEvent<HTMLElement>) => void,
  /**
   * Коллбек, выполняемый при скролле выпадающего списка
   */
  onScrollOptionList?: (event: SyntheticEvent<HTMLDivElement>) => void,
  /**
   * Компонент для кастомной отрисовки опций
   */
  CustomOptionComponent?: TCustomOption<Option>,
  /**
   * Элемент для кастомной отрисовки поля выбранной опции
   */
  customSelectInput?: React$Node,
  /**
   * Элемент для отрисовки шапки в выпадающем списке
   */
  optionListHeader?: React$Node,
  /**
   * Элемент для отрисовки футера в выпадающем списке
   */
  optionListFooter?: React$Node,
|};
export type TBaseSelectProps<Option> = {|
  ...TGeneralSelectProps<Option>,
  /**
   * Открыт/закрыт выпадающий список
   */
  isOpen: boolean,
  /**
   * Выбранная опция (или опции)
   */
  value?: Option | Option[],
  /**
   * Наличие иконки очистки
   */
  hasClearIcon?: boolean,
  /**
   * Коллбек, выполняемый при отрытии выпадающего списка
   */
  onSetOpen: (isOpen: boolean) => void,
  /**
   * Коллбек, выполняемый при выборе опции
   */
  onChange: (o: Option) => void,
  /**
   * Коллбек, выполняемый при нажатие иконки очистки
   */
  onClear?: (event: SyntheticEvent<HTMLElement>) => void,
|};
