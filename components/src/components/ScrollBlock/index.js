import React, {PureComponent} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './ScrollBlock.less';

const cx = classNames.bind(styles);

const THEME = {
  light: 'light',
  dark: 'dark',
};

export class ScrollBlock extends PureComponent {
  /** @type {{light: string, dark: string}} */
  static theme = THEME;

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    theme: PropTypes.oneOf(Object.keys(THEME)),
  };

  static defaultProps = {
    className: '',
    theme: THEME.dark,
  };

  render() {
    const {children, className, theme, ...props} = this.props;
    return (
      <Scrollbars
        ref={this.props.innerRef}
        renderTrackVertical={properties => (
          <div
            {...properties}
            className={cx(className, 'track-vertical', {
              [`theme_${theme}`]: true,
            })}
            style={{...properties.style, width: 8}}
          />
        )}
        {...props}
      >
        {children}
      </Scrollbars>
    );
  }
}
