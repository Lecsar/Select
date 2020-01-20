// @flow

import React from 'react';

import {storiesOf} from 'modules/storybook';

import {MultiSelect, Select} from './';
import {optionList} from './mocks';

const test = () => <div />;

storiesOf(module).add('NEW_SELECT', () => {
  return (
    <div style={{margin: '30px 40px'}}>
      <Select
        initialValue={optionList[2]}
        options={optionList}
        onChange={console.log}
      />
    </div>
  );
});

storiesOf(module).add('NEW_MULTISELECT', () => {
  return (
    <div style={{margin: '30px 40px'}}>
      <MultiSelect
        placeholder="Test"
        initialValues={[optionList[2], optionList[3], optionList[4]]}
        options={optionList}
        onChange={console.log}
      />
    </div>
  );
});
