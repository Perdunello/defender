const TOGGLE_FORM = 'TOGGLE_FORM'
const CHANGE_MODAL_FORM = 'CHANGE_MODAL_FORM'
const initialState = {
    form: 'login',
    isOpenForm: false
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
export default AuthReducer