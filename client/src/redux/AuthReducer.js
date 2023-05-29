import API from "../api/api";

const TOGGLE_FORM = 'TOGGLE_FORM'
const CHANGE_MODAL_FORM = 'CHANGE_MODAL_FORM'
const SET_AUTH = 'SET_AUTH'
const SET_AUTH_DATA = 'SET_AUTH_DATA'
const LOGOUT = 'LOGOUT'

const initialState = {
    form: 'login',
    isOpenForm: false,
    isAuth: false,
    authData: {},
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FORM:
            return {
                ...state,
                isOpenForm: !state.isOpenForm
            }
        case CHANGE_MODAL_FORM:
            return {
                ...state,
                form: state.form === 'login' ? 'signup' : 'login'
            }
        case SET_AUTH:
            return {
                ...state,
                isAuth: true
            }
        case SET_AUTH_DATA:
            return {
                ...state,
                authData: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                isAuth: false,
                authData: {}
            }
        default:
            return state
    }
}

export const toggleForm = () => {
    return {type: TOGGLE_FORM}
}
export const changeModalForm = () => {
    return {type: CHANGE_MODAL_FORM}
}
export const setAuth = () => {
    return {type: SET_AUTH}
}
export const setAuthData = (payload) => {
    return {type: SET_AUTH_DATA, payload}
}
export const logout = () => {
    return {type: LOGOUT}
}
export const signupRequest = (data) => {
    return dispatch => {
        API.signup(data).then(response => {
            console.log(response)
            if (response.status === 200 && response.data.message !== 'Account with this email already exists') {
                dispatch(setAuth())
                dispatch(setAuthData(response.data))
            }
        })
    }
}
export const loginRequest = (data) => {
    return dispatch => {
        API.login(data).then(response => {
            console.log(response)
            dispatch(setAuth())
            dispatch(setAuthData(response.data))
        })
    }
}
export const autoLoginRequest = () => {
    return dispatch => {
        API.autoLogin().then(response => {
            if (response?.status === 200) {
                dispatch(setAuth())
                dispatch(setAuthData(response.data))
            }
        })
    }
}
export const logoutRequest = () => {
    return dispatch => {
        API.logout().then(response => {
            console.log(response)
            if (response.status === 200) {
                dispatch(logout())
            }
        })
    }
}
export default AuthReducer