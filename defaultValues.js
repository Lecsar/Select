// @flow strict

import {type TBaseOption} from './types';

export const defaultGetOptionKey = (option: TBaseOption) => option.id;
export const defaultGetOptionName = (option: TBaseOption) => option.name;
export const defaultGetOptionValue = (option: TBaseOption) => option.id;
export const defaultNoOptionsMessage = `Значения нет в справочнике. Возможно, вы ошиблись в написании.`;
