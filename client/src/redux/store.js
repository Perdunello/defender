import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./AuthReducer";
import FilesReducer from "./FilesReducer";

const reducers = combineReducers({
    auth: AuthReducer,
    files:FilesReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store