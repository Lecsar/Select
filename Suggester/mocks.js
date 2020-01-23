// @flow

export const optionList = [
  {id: 1, name: 'Test_1'},
  {id: 2, name: 'Test_2'},
  {
    id: 3,
    name:
      'Test_3 Test_3 Test_3Test_3 Test_3 Test_3 Test_3 Test_3 Test_3 Test_3Test_3 Test_3 Test_3 Test_3 Test_3 Test_3 Test_3Test_3 Test_3 Test_3 Test_3',
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
];

export const mockLoadOptions = (searchValue: string): Promise<any[]> =>
  new Promise(res =>
    setTimeout(
      () =>
        res(optionList.filter(option => option.name.indexOf(searchValue) >= 0)),
      1000
    )
  );
