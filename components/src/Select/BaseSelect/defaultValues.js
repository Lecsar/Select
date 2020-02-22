// @flow strict

import {type TBaseOption} from './';

export const defaultGetOptionId = (option?: TBaseOption) => option?.id || '';
export const defaultGetOptionName = (option?: TBaseOption) => option?.name || '';
export const defaultLoadingMessage = `Загрузка...`;
export const defaultNoOptionsMessage = `Значения нет в справочнике. Возможно, вы ошиблись в написании.`;
