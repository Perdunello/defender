import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./AuthReducer";

const reducers = combineReducers({
    auth: AuthReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store