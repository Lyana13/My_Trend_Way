import reducer from './reducers';

export { addUser, getUser, updateUser, clearUser, setUserToken, gettingToken } from './actions';//default as authActions
export { default as userTypes } from './types';

export default reducer;
