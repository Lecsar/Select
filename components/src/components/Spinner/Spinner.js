// @flow strict

import * as React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import Overlay from './Overlay';

import style from './Spinner.less';

const cx = classNames.bind(style);

const SIZE = {
  xs: 'xs',
  sm: 'sm',
  nm: 'nm',
  lg: 'lg',
  xl: 'xl',
};

const COLOR = {
  blue: 'blue',
  white: 'white',
};

type Props = {|
  +className?: string,
  +strokeWidth: number,
  +size: $Values<typeof SIZE>,
  +color: $Values<typeof COLOR>,
|} & React.ElementConfig<'div'>;

const Spinner = ({className, strokeWidth, size, color, ...props}: Props) => (
  <div {...props} className={cx('Spinner', `Spinner_${size}`, `Spinner_color_${color}`, className)}>
    <svg className={cx('circular')} viewBox="25 25 50 50">
      <circle
        className={cx('path')}
        cx="50"
        cy="50"
        r="20"
        fill="none"
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
      />
    </svg>
  </div>
);

Spinner.Overlay = Overlay;

Spinner.propTypes = {
  className: PropTypes.string,
  strokeWidth: PropTypes.number,
  size: PropTypes.oneOf(Object.values(SIZE)),
  color: PropTypes.oneOf(Object.values(COLOR)),
};

Spinner.defaultProps = {
  strokeWidth: 4,
  size: SIZE.nm,
  color: COLOR.blue,
};

/**
 * @type {{xs: string, sm: string, nm: string, lg: string}}
 */
Spinner.size = SIZE;
/**
 * @type {{blue: string, white: string}}
 */
Spinner.color = COLOR;

export default Spinner;
