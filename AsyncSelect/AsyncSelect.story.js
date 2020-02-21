// @flow

import React, {useCallback, useState} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import * as knobs from '@storybook/addon-knobs';

import {AsyncSelect, type TLoadOptionParams, type TLoadOptionsData} from '.';

export const optionList = [
  {id: 1, name: 'Test_1'},
  {id: 2, name: 'Test_2 Test_2 Test_3 Test_2 Test_2 Test_3F'},
  {
    id: 3,
    name: 'Test_3 Test_3 Test_3Test_3 Test_3 Test_3 Test_3 Test_3 Test_3 Test_3Test_3 Test_3 Test_3 T',
  },
  {id: 4, name: 'Test_4'},
  {id: 5, name: 'Test_5'},
  {id: 6, name: 'Test_6'},
  {id: 7, name: 'Test_7'},
  {id: 8, name: 'Test_8'},
  {id: 9, name: 'Test_9'},
  {id: 10, name: 'Test_10'},
  {id: 11, name: 'Test_11'},
  {id: 12, name: 'Test_12'},
  {id: 13, name: 'Test_12'},
  {id: 14, name: 'Test_12'},
  {id: 16, name: 'Test_12'},
  {id: 17, name: 'Test_12'},
  {id: 18, name: 'Test_12'},
  {id: 19, name: 'Test_12'},
  {id: 20, name: 'Test_12'},
  {id: 21, name: 'Test_12'},
  {id: 22, name: 'Test_12'},
  {id: 23, name: 'Test_12'},
  {id: 24, name: 'Test_12'},
  {id: 25, name: 'Test_12'},
  {id: 26, name: 'Test_12'},
  {id: 27, name: 'Test_12'},
  {id: 28, name: 'Test_12'},
  {id: 29, name: 'Test_12'},
  {id: 30, name: 'Test_12'},
  {id: 31, name: 'Test_12'},
  {id: 32, name: 'Test_12'},
  {id: 33, name: 'Test_12'},
  {id: 34, name: 'Test_12'},
  {id: 35, name: 'Test_12'},
  {id: 36, name: 'Test_12'},
  {id: 37, name: 'Test_12'},
];

const isFindedOption = (searchValue, {name}) => name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0;

const mockLoadOptions = <T: {}>({search, perPage, page}: TLoadOptionParams): Promise<TLoadOptionsData<T>> =>
  new Promise(res =>
    setTimeout(() => {
      const fromOptionIndex = perPage * (page - 1);
      // $FlowFixMe
      const options: T[] = optionList
        .filter(isFindedOption.bind(null, search))
        .slice(fromOptionIndex, fromOptionIndex + perPage);

      const total = optionList.length;
      const amountPages = Math.round(optionList.length / perPage);

      const isNext = amountPages > page;

      const result: TLoadOptionsData<T> = {
        options,
        total,
        page,
        isNext,
      };

      res(result);
    }, 1000)
  );

const selectSize = {
  sm: 'sm',
  nm: 'nm',
  lg: 'lg',
};

storiesOf(module)
  .addDecorator(knobs.withKnobs)
  .add('AsyncSelect', () => {
    const [value, setValue] = useState(optionList[1]);

    const size = knobs.select('size', selectSize, selectSize.sm);

    const isClearable = knobs.boolean('isClearable', false);
    const isDisabled = knobs.boolean('isDisabled', false);
    const hasDropDownIcon = knobs.boolean('hasDropDownIcon', true);
    const hasInfinityScroll = knobs.boolean('hasInfinityScroll', true);

    const placeholder = knobs.text('placeholder', 'Начните что-то вводить');
    const maxOptionListWidth = knobs.number('maxOptionListWidth');
    const error = knobs.boolean('error', false);
    const noOptionsMessage = knobs.text('noOptionsMessage', 'Нет опций');

    const onChange = option => {
      action('onChange')(option);
      setValue(option);
    };
    const onChangeSearchValue = action('onChangeSearchValue');

    return (
      <div className="grid3x3">
        <div style={{width: 200}} className="grid3x3__item--topLeft">
          <AsyncSelect
            size={size}
            selectedOptionData={value}
            loadOptions={mockLoadOptions}
            maxOptionListWidth={maxOptionListWidth}
            error={error}
            noOptionsMessage={noOptionsMessage}
            placeholder={placeholder}
            isClearable={isClearable}
            isDisabled={isDisabled}
            hasInfinityScroll={hasInfinityScroll}
            hasDropDownIcon={hasDropDownIcon}
            onChange={onChange}
            onChangeSearchValue={onChangeSearchValue}
          />
        </div>

        <div style={{width: 400}} className="grid3x3__item--topRight">
          <AsyncSelect
            size="lg"
            size={size}
            selectedOptionData={value}
            loadOptions={mockLoadOptions}
            maxOptionListWidth={maxOptionListWidth}
            error={error}
            noOptionsMessage={noOptionsMessage}
            placeholder={placeholder}
            isClearable={isClearable}
            isDisabled={isDisabled}
            hasInfinityScroll={hasInfinityScroll}
            hasDropDownIcon={hasDropDownIcon}
            onChange={onChange}
            onChangeSearchValue={onChangeSearchValue}
          />
        </div>

        <div style={{width: 700}} className="grid3x3__item--center">
          <AsyncSelect
            size="lg"
            size={size}
            selectedOptionData={value}
            loadOptions={mockLoadOptions}
            maxOptionListWidth={maxOptionListWidth}
            error={error}
            noOptionsMessage={noOptionsMessage}
            placeholder={placeholder}
            isClearable={isClearable}
            isDisabled={isDisabled}
            hasInfinityScroll={hasInfinityScroll}
            hasDropDownIcon={hasDropDownIcon}
            onChange={onChange}
            onChangeSearchValue={onChangeSearchValue}
          />
        </div>

        <div style={{width: 300}} className="grid3x3__item--bottomLeft">
          <AsyncSelect
            size="lg"
            size={size}
            selectedOptionData={value}
            loadOptions={mockLoadOptions}
            maxOptionListWidth={maxOptionListWidth}
            error={error}
            noOptionsMessage={noOptionsMessage}
            placeholder={placeholder}
            isClearable={isClearable}
            isDisabled={isDisabled}
            hasInfinityScroll={hasInfinityScroll}
            hasDropDownIcon={hasDropDownIcon}
            onChange={onChange}
            onChangeSearchValue={onChangeSearchValue}
          />
        </div>

        <div style={{width: 444}} className="grid3x3__item--bottomRight">
          <AsyncSelect
            size="lg"
            size={size}
            selectedOptionData={value}
            loadOptions={mockLoadOptions}
            maxOptionListWidth={maxOptionListWidth}
            error={error}
            noOptionsMessage={noOptionsMessage}
            placeholder={placeholder}
            isClearable={isClearable}
            isDisabled={isDisabled}
            hasInfinityScroll={hasInfinityScroll}
            hasDropDownIcon={hasDropDownIcon}
            onChange={onChange}
            onChangeSearchValue={onChangeSearchValue}
          />
        </div>
      </div>
    );
  });
