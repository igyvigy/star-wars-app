export const logger = () => {
  return next => action => {
    const returnValue = next(action);
    // console.debug(`films: ${Object.values(getState().api.byId['films'])}`);
    return returnValue;
  };
};
