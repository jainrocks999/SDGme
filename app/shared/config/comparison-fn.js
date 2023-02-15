export const comparisonFn = (action, actionQueue) => {
  if (typeof action === 'object') {
    return actionQueue.find((queued) => isEqual(queued, action));
  }
  return undefined;
};
