// @flow strict

import React, {useCallback, useState} from 'react';
import {action} from '@storybook/addon-actions';
import * as knobs from '@storybook/addon-knobs';

import {storiesOf} from 'modules/storybook';

import {Select} from '..';

type TOption = {|
  id: IdType,
  name: string,
|};

export const optionList: TOption[] = [
  {id: 1, name: 'Test_1'},
  {id: 2, name: 'Test_2 Test_2 Test_2 Test_2 Test_2 Test_2 '},
  {
    id: 3,
    name: 'Test_3 Test_3 Test_3Test_3 Test_3 Test_3 Test_3 Test_3 Test_3 Test_3Test_3 Test_3 Test_3 Test_3 ',
  },
  {id: 4, name: 'Test_4'},
  {id: 5, name: 'Test_5'},
  {id: 6, name: 'Test_6'},
  {id: 7, name: 'Test_7'},
  {id: 8, name: 'Test_8'},
  {id: 9, name: 'Test_9'},
  {id: 10, name: 'Test_10'},
  {id: 11, name: 'Test_11'},
  {id: 12, name: '12'},
];

const selectSize = {
  sm: 'sm',
  nm: 'nm',
  lg: 'lg',
};

storiesOf(module)
  .addDecorator(knobs.withKnobs)
  .add('Single Select', () => {
    const [selectedValue, setSelectedValue] = useState(optionList[1]);

    const size = knobs.select('size', selectSize, selectSize.sm);
    const isClearable = knobs.boolean('isClearable', false);
    const isDisabled = knobs.boolean('isDisabled', false);
    const isLoading = knobs.boolean('isLoading', false);
    const hasDropDownIcon = knobs.boolean('hasDropDownIcon', true);
    const placeholder = knobs.text('placeholder', 'Начните что-то вводить');
    const maxOptionListWidth = knobs.number('maxOptionListWidth');
    const error = knobs.text('error', '');
    const noOptionsMessage = knobs.text('noOptionsMessage', 'Нет опций');
    const onChange = useCallback(option => {
      action('onChange')(option);
      setSelectedValue(option);
    }, []);

    return (
      <div className="grid3x3">
        <div style={{width: 400}} className="grid3x3__item--topLeft">
          <Select
            placeholder={placeholder}
            maxOptionListWidth={maxOptionListWidth}
            size={size}
            options={[]}
            error={error}
            noOptionsMessage={noOptionsMessage}
            isClearable={isClearable}
            isDisabled={isDisabled}
            isLoading={isLoading}
            hasDropDownIcon={hasDropDownIcon}
            onChange={onChange}
          />
        </div>

        <div style={{width: 500}} className="grid3x3__item--topRight">
          <Select
            placeholder={placeholder}
            maxOptionListWidth={maxOptionListWidth}
            size={size}
            value={selectedValue}
            options={optionList}
            error={error}
            noOptionsMessage={noOptionsMessage}
            isClearable={isClearable}
            isDisabled={isDisabled}
            isLoading={isLoading}
            hasDropDownIcon={hasDropDownIcon}
            onChange={onChange}
          />
        </div>

        <div style={{width: 250}} className="grid3x3__item--center">
          <Select
            placeholder={placeholder}
            maxOptionListWidth={maxOptionListWidth}
            size={size}
            value={selectedValue}
            options={optionList}
            error={error}
            noOptionsMessage={noOptionsMessage}
            isClearable={isClearable}
            isDisabled={isDisabled}
            isLoading={isLoading}
            hasDropDownIcon={hasDropDownIcon}
            onChange={onChange}
          />
        </div>

        <div style={{width: 200}} className="grid3x3__item--bottomLeft">
          <Select
            placeholder={placeholder}
            maxOptionListWidth={maxOptionListWidth}
            size={size}
            value={selectedValue}
            options={optionList}
            error={error}
            noOptionsMessage={noOptionsMessage}
            isClearable={isClearable}
            isDisabled={isDisabled}
            isLoading={isLoading}
            hasDropDownIcon={hasDropDownIcon}
            onChange={onChange}
          />
        </div>

        <div style={{width: 100}} className="grid3x3__item--bottomRight">
          <Select
            placeholder={placeholder}
            maxOptionListWidth={maxOptionListWidth}
            size={size}
            value={selectedValue}
            options={optionList}
            error={error}
            noOptionsMessage={noOptionsMessage}
            isClearable={isClearable}
            isDisabled={isDisabled}
            isLoading={isLoading}
            hasDropDownIcon={hasDropDownIcon}
            onChange={onChange}
          />
        </div>
      </div>
    );
  });
