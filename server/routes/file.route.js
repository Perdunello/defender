const Router = require('express')
const fileRouter = new Router()
const fileController = require('../controllers/file.controller')

fileRouter.get('/:chapter', fileController.getFiles)
fileRouter.get('/:chapter/:filename', fileController.getFile)
fileRouter.get('/download/:chapter/:filename', fileController.downloadFile)
fileRouter.get('/save/:filename', fileController.saveFile)

module.exports = fileRouter