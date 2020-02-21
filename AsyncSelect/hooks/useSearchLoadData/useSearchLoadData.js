// @flow strict

import {useCallback, useEffect, useMemo, useState} from 'react';
import debounce from 'lodash/debounce';

import {type TBaseOption} from '../../../BaseSelect';
import {useLoadData} from '../useLoadData';

export type TLoadOptionParams = {|
  search: string,
  page: number,
  perPage: number,
|};

export type TLoadOptionsData<Option> = {|
  options: Option[],
  total: number,
  page: number,
  isNext?: boolean,
|};

type TLazySearchParams<Option> = {|
  loadOptions: (loadOptionsParams: TLoadOptionParams) => Promise<TLoadOptionsData<Option>>,
  searchValue?: string,
  debounceTime?: number,
|};

type TLazyScrollSearchData<Option> = {|
  options: Option[],
  isLoading: boolean,
  hasUnloadedOptions: boolean,
  total: number,
  loadMoreOptions: () => void,
|};

export const useSearchLoadData = <T: TBaseOption>({
  loadOptions,
  searchValue = '',
  debounceTime = 500,
}: TLazySearchParams<T>): TLazyScrollSearchData<T> => {
  const {data, isLoading, patchedLoadData} = useLoadData(loadOptions);

  const [page, setPage] = useState(1);
  const [options, setResultOptions] = useState<T[]>([]);

  const debounceLoadDataOnChangeSearch = useMemo(() => debounce(patchedLoadData, debounceTime), [
    debounceTime,
    patchedLoadData,
  ]);

  useEffect(() => {
    debounceLoadDataOnChangeSearch({search: searchValue, page, perPage: 20});
  }, [searchValue, page, debounceLoadDataOnChangeSearch]);

  useEffect(() => {
    if (data) {
      const {page, options} = data;
      setResultOptions(resultOptions => (page === 1 ? options : [...resultOptions, ...options]));
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const loadMoreOptions = useCallback(() => {
    if (data?.isNext && !isLoading) {
      setPage(page => page + 1);
    }
  }, [data, isLoading]);

  return {
    options,
    isLoading,
    loadMoreOptions,
    hasUnloadedOptions: data?.isNext || false,
    total: data?.total || 0,
  };
};
