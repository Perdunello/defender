const Router = require('express')
const loginisationRouter = new Router()
const loginisationController = require('../controllers/auth.controller')


loginisationRouter.post('/signup', loginisationController.signup)
loginisationRouter.post('/login', loginisationController.login)
loginisationRouter.get('/auto-login', loginisationController.autoLogin)
loginisationRouter.get('/logout', loginisationController.logout)
loginisationRouter.get('/refresh', loginisationController.refresh)
module.exports = loginisationRouter