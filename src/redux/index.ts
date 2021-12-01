import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const rootReducer = combineReducers({reducers});

export type rootState = ReturnType<typeof rootReducer>;

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store;
