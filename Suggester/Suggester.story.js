// @flow

import React from 'react';

import {storiesOf} from 'modules/storybook';

import {mockLoadOptions, optionList} from './mocks';
import {Suggester} from '.';

storiesOf(module).add('NEW_SUGGESTER', () => {
  return (
    <div style={{margin: '30px 40px'}}>
      <Suggester
        size="lg"
        initialValue={optionList[1]}
        loadOptions={mockLoadOptions}
        onChange={console.log}
      />
    </div>
  );
});
