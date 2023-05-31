import API from "../api/api";

const SET_FILES = 'SET_FILES'

const initialState = {
    filesData: [],
}

const FilesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILES:
            return {
                ...state,
                filesData: action.payload
            }
        default:
            return state
    }
}
const setFiles = (payload) => {
    return {type: SET_FILES, payload}
}
export const getFilesRequest = (chapter) => {
    return dispatch => {
        API.getFiles(chapter).then(response => {
            if (response.status === 200) {
                dispatch(setFiles(response.data))
            }
        })
    }
}
export default FilesReducer