// @flow strict

import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import debounce from 'lodash/debounce';

import {makeCancelable} from 'helpers/promise';

import {type TBaseOption} from '../Options/types';

type TAsyncSearchParams<Option> = {|
  loadOptions: (searchValue: string) => Promise<Option[]>,
  initialOptions: Option[],
  searchValue: string,
  debounceTime: number,
|};

export const useAsyncSearchOptions = <Option: TBaseOption>({
  loadOptions,
  initialOptions,
  searchValue,
  debounceTime,
}: TAsyncSearchParams<Option>): {options: Option[], isLoading: boolean} => {
  const [options, setOptions] = useState<Option[]>(initialOptions);
  const [isLoading, setLoading] = useState(false);
  const cancelableLoadOptionsRef = useRef({
    cancel: () => {},
  });

  const patchLoadOptions = useCallback(
    (searchValue: string) => {
      setLoading(true);
      return loadOptions(searchValue);
    },
    [loadOptions]
  );

  const cancelableLoadOptions = useCallback(
    (searchValue: string) => {
      cancelableLoadOptionsRef.current = makeCancelable(
        patchLoadOptions(searchValue)
      );
      cancelableLoadOptionsRef.current.promise
        .then(options => {
          setLoading(false);
          setOptions(options);
        })
        .catch(error => {
          if (!error.isCanceled) {
            console.error(error);
            setLoading(false);
          }
        });
    },
    [patchLoadOptions]
  );

  const debouncedLoadOptions = useMemo(
    () => debounce(cancelableLoadOptions, debounceTime),
    [cancelableLoadOptions, debounceTime]
  );

  useEffect(() => {
    debouncedLoadOptions(searchValue);
    return () => {
      cancelableLoadOptionsRef.current.cancel();
    };
  }, [debouncedLoadOptions, searchValue]);

  return {
    options,
    isLoading,
  };
};

type TConfigInitialSettingSelectedOption<T: TBaseOption> = {|
  initialValue?: T,
  options: T[],
  getOptionValue: (option?: T) => IdType,
  setSelectedOption: (option?: T) => void,
|};

export const useInitialSettingSelectedOption = <T: TBaseOption>({
  initialValue,
  options,
  getOptionValue,
  setSelectedOption,
}: TConfigInitialSettingSelectedOption<T>) => {
  const [isFirstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    const needSetSelectedValue =
      isFirstLoading && initialValue && options.length;

    if (needSetSelectedValue) {
      setFirstLoading(false);

      const selectedOption = options.find(
        option => getOptionValue(initialValue) === getOptionValue(option)
      );

      if (selectedOption) {
        setSelectedOption(selectedOption);
      }
    }
  }, [
    isFirstLoading,
    options,
    initialValue,
    getOptionValue,
    setSelectedOption,
  ]);
};
