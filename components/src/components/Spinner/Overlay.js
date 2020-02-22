//* @flow strict

import * as React from 'react';
import classNames from 'classnames/bind';

import style from './Overlay.less';

const cx = classNames.bind(style);

const Overlay = () => <div className={cx('Overlay')} />;

export default Overlay;
