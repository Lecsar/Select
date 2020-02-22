// @flow

import * as React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import classNames from 'classnames/bind';

import styles from './ScrollBlock.less';

const cx = classNames.bind(styles);

const THEME = {
  light: 'light',
  dark: 'dark',
};

type Props = {|
  +children: React$Node,
  +className?: string,
  +theme: $Values<typeof THEME>,
  +innerRef?: (React.Ref<*> | null) => mixed,

  // Scrollbars props
  +autoHeight?: boolean,
  +autoHeightMin?: number,
  +autoHeightMax?: number,
  +autoHideTimeout?: number,
  +autoHideDuration?: number,
|};

export default class ScrollBlock extends React.PureComponent<Props> {
  /** @type {{light: string, dark: string}} */
  static theme = THEME;

  static defaultProps = {
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
