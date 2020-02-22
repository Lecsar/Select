// @flow strict

import {useEffect, useRef, useState} from 'react';
import debounce from 'lodash/debounce';

// TODO: вынести в хелперы по проекту
export const useElementWidth = (resizeDebounceTime: number = 300) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref.current && ref.current.offsetWidth && ref.current.offsetWidth !== width) {
      setWidth(ref.current.offsetWidth);
    }
  }, [width, ref]);

  useEffect(() => {
    const debounceResize = debounce(() => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }, resizeDebounceTime);

    window.addEventListener('resize', debounceResize);
    return () => {
      window.removeEventListener('resize', debounceResize);
    };
  }, [ref, resizeDebounceTime]);

  return {width, ref};
};
