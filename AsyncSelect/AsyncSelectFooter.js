// @flow strict

import React, {memo} from 'react';
import cn from 'classnames/bind';

import style from './style.less';

const cx = cn.bind(style);

type TProps = {|
  optionsLength: number,
  total: number,
  isLoading: boolean,
  hasInfinityScroll: boolean,
|};

const BaseAsyncSelectFooter = ({optionsLength, total, isLoading, hasInfinityScroll}: TProps) => {
  if (isLoading) {
    return <p className={cx('statusText')}>Загружаем...</p>;
  }

  if (hasInfinityScroll) {
    return (
      <p className={cx('statusText')}>
        Загружено {optionsLength} из {total}
      </p>
    );
  }

  return (
    <p className={cx('statusText')}>
      Загружено {optionsLength} из {total}.
      <br />
      Уточните запрос, чтобы увидеть остальные.
    </p>
  );
};

export const AsyncSelectFooter = memo<TProps>(BaseAsyncSelectFooter);
