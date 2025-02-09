const logger = (store) => (next) => (action) => {
  console.log(action);
  /*
    const state = store.getState();
    if (action.type === 'channels/newChannel') {
    }
    */
    const result = next(action);
    console.log('next state', store.getState());
    return result;
  };

export default logger;