// @flow strict

import {useCallback, useEffect, useRef} from 'react';

export const useOnClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLElement | null>(null);

  const listener = useCallback(
    (event: *) => {
      // $FlowFixMe
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler();
    },
    [ref, handler]
  );

  useEffect(() => {
    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [listener]);

  return ref;
};
