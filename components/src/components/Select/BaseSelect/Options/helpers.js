// @flow strict

import {type Placement} from 'react-popper';

const hasWord = (findedWord: string, checkedWord?: string = '') => checkedWord.indexOf(findedWord) >= 0;

export const getOptionListWrapperClassname = (placement?: Placement) => {
  return {
    optionListWrapper: true,
    optionListWrapper_topMargin: hasWord('bottom', placement),
    optionListWrapper_bottomMargin: hasWord('top', placement),
  };
};
