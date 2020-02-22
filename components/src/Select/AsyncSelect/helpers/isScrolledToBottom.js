// @flow strict

const THRESHOLD_HEIGHT = 30;

// TODO: занести внутрь AsyncSelect
export const isScrolledToBottom = (event: SyntheticEvent<HTMLDivElement>) => {
  // $FlowFixMe
  const {target}: {target: Element} = event;
  const {scrollHeight, scrollTop, offsetHeight} = target;
  return scrollHeight - scrollTop - offsetHeight < THRESHOLD_HEIGHT;
};
