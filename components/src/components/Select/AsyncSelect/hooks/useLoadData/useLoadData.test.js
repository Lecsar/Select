// @flow strict

import {renderHook} from '@testing-library/react-hooks';

import {useLoadData} from '.';

const wait = waitTime => new Promise(res => setTimeout(res, waitTime));

describe('useLoadData', () => {
  it('Проверка корректности работы debounce', async () => {
    const testLoadData = jest.fn(() => Promise.resolve([]));
    const testDebounceTimeMs = 3;
    const timeLessDebounceMs = 1;
    const timeMoreDebounceMs = 5;

    expect(testDebounceTimeMs > timeLessDebounceMs && timeMoreDebounceMs > testDebounceTimeMs).toBe(true);

    // $FlowFixMe
    const {result} = renderHook(() => useLoadData(testLoadData, testDebounceTimeMs));

    for (let i = 0; i < 10; i++) {
      result.current.patchedLoadData();
    }

    expect(testLoadData.mock.calls.length).toBe(0);

    await wait(timeLessDebounceMs);
    result.current.patchedLoadData();
    expect(testLoadData.mock.calls.length).toBe(0);

    await wait(timeMoreDebounceMs);
    expect(testLoadData.mock.calls.length).toBe(1);

    result.current.patchedLoadData();
    await wait(timeMoreDebounceMs);
    expect(testLoadData.mock.calls.length).toBe(2);
  });

  it('Проверка корректности загрузки данных', async () => {
    const testOptions = ['test_1', 'test_2'];
    const testLoadData = jest.fn(() => {
      return Promise.resolve(testOptions);
    });
    const testDebounceTimeMs = 3;
    const timeLessDebounceMs = 1;
    const timeMoreDebounceMs = 5;

    expect(testDebounceTimeMs > timeLessDebounceMs && timeMoreDebounceMs > testDebounceTimeMs).toBe(true);

    // $FlowFixMe
    const {result} = renderHook(() => useLoadData(testLoadData, testDebounceTimeMs));

    result.current.patchedLoadData();

    expect(result.current.data).toBe(null);

    await wait(timeLessDebounceMs);
    expect(result.current.data).toBe(null);

    await wait(timeMoreDebounceMs);
    expect(result.current.data).toBe(testOptions);
  });

  it('Проверка отмены запроса (отмены обновления стейта) при размонтированиие хука', async () => {
    const testOptions = ['test_1', 'test_2'];
    const timeLoadData = 5;
    const timeMoreLoadData = 7;

    expect(timeMoreLoadData > timeLoadData).toBe(true);

    const testLoadData = jest.fn(() => {
      return new Promise(res => setTimeout(() => res(testOptions), timeLoadData));
    });
    const testDebounceTimeMs = 3;
    const timeMoreDebounceMs = 5;

    expect(timeMoreDebounceMs > testDebounceTimeMs).toBe(true);

    // $FlowFixMe
    const {result, unmount} = renderHook(() => useLoadData(testLoadData, testDebounceTimeMs));

    result.current.patchedLoadData();

    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);

    await wait(timeMoreDebounceMs);
    expect(testLoadData.mock.calls.length).toBe(1);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.isLoading).toBe(true);

    unmount();
    await wait(timeMoreLoadData);

    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('Проверка корректности перехвата ошибки', async () => {
    const timeLoadData = 5;
    const timeMoreLoadData = 7;

    expect(timeMoreLoadData > timeLoadData).toBe(true);

    const customError = {error: true};
    const testLoadData = jest.fn(() => {
      return new Promise((_, rej) => setTimeout(() => rej(customError), timeLoadData));
    });
    const testDebounceTimeMs = 3;
    const timeMoreDebounceMs = 5;

    expect(timeMoreDebounceMs > testDebounceTimeMs).toBe(true);

    // $FlowFixMe
    const {result} = renderHook(() => useLoadData(testLoadData, testDebounceTimeMs));

    result.current.patchedLoadData();

    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);

    await wait(timeMoreDebounceMs);

    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);

    await wait(timeMoreLoadData);

    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(customError);
  });

  it('Проверка корректности отмены загрузки, если размаунт произошел быстрее дебаунса', async () => {
    const testLoadData = jest.fn();
    const testDebounceTimeMs = 3;
    const timeMoreDebounceMs = 5;

    expect(testDebounceTimeMs < timeMoreDebounceMs).toBe(true);

    // $FlowFixMe
    const {result, unmount} = renderHook(() => useLoadData(testLoadData, testDebounceTimeMs));

    result.current.patchedLoadData();

    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);

    unmount();
    await wait(timeMoreDebounceMs);

    expect(testLoadData.mock.calls.length).toBe(0);
    expect(result.current.data).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});
