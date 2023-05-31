import axios from 'axios'
import {getCookie} from "../cookies/cookies";


axios.defaults.baseURL = 'http://localhost:3001/';
// axios.defaults.headers.common['Authorization'] = getCookie('accessToken');
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.withCredentials = true
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'

const API = {
    signup(data) {
        return axios.post('/auth/signup', data,).then(response => {
            return response
        })
    },
    login(data) {
        return axios.post('/auth/login', data).then(response => {
            return response
        })
    },
    autoLogin() {//call it for first enter in App.js. If client have cookie=>he is logging
        if (!getCookie('accessToken')) {
            return this.refresh().then(async (response) => {
                if (response.data.message !== 'You need to login') {
                    return await axios.get('/auth/auto-login').then(response => response)
                }
            })
        } else {//if we have access=>we don`t need to refresh token
            if (getCookie('accessToken'))
                return axios.get('/auth/auto-login').then(response => response)
        }
    },
    refresh() {//refresh access token. If refresh token is not exist=>do nothing
        return axios.get('/auth/refresh').then(response => response)
    },
    logout() {
        return axios.get('auth/logout').then(response => response)
    },
    getFiles(chapter) {
        return axios.get(`files/${chapter}`).then(response => response)
    },
    openFile(name) {
        return axios.get(`files/small_arms/${name}`, {responseType: 'blob'}).then(response => response)
    },
    // saveFile(name) {
    //     return axios.get(`files/save/awdawd`).then(response => response)
    // },
}

export default API