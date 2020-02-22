// @flow

import * as React from 'react';
import classNames from 'classnames/bind';

import style from './Icon.less';

const cx = classNames.bind(style);

const SIZE = {
  xs: 'xs',
  sm: 'sm',
  nm: 'nm',
  lg: 'lg',
  xl: 'xl',
  none: 'none',
};

export type Props = {
  size: $Values<typeof SIZE>,
  name: string,
  innerRef?: (node: ?HTMLElement) => mixed,
} & React.ElementProps<'svg'>;

export default class Icon extends React.PureComponent<Props> {
  /**
   * @type {{xs: string, sm: string, nm: string, lg: string, xl: string, none: string}}
   */
  static size = SIZE;

  static defaultProps = {
    size: SIZE.nm,
  };

  static renderIcon(icon: *, className: ?string, size: $Values<typeof SIZE> = Icon.size.nm) {
    if (icon && typeof icon === 'string') {
      return <Icon className={className} name={icon} size={size} />;
    }
    if (icon && React.isValidElement(icon)) {
      return <icon.type {...icon.props} className={cx(icon.props.className, className)} />;
    }
    return null;
  }

  render() {
    const {size, className, name, innerRef, ...rest} = this.props;
    if (!name) {
      return null;
    }
    const iconName = name.startsWith('icon-') ? `#${name}` : `#icon-${name}`;

    return (
      <svg {...rest} className={cx('Icon', className, `Icon_size_${size}`)}>
        <use xlinkHref={iconName} />
      </svg>
    );
  }
}
