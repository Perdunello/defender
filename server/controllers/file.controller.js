const db = require('../DB')
const fs = require("fs");
const path = require('path');

class FileController {
    async getFiles(req, res) {
        console.log('dawdawdawdt')
        const chapter = req.params.chapter;
        const que = `SELECT * FROM files WHERE chapter='${chapter}' `
        await db.query(que, (err, response) => {
            if (err) {
                res.status('500').json({message: 'Something went wrong'})
                throw err
            } else {
                res.status(200).json([...response,])
            }
        })
    }

    async getFile(req, res) {
        console.log('ggget')
        const {chapter, filename} = req.params;
        const filePath = path.join(__dirname, `../static/${chapter}`, filename);
        res.sendFile(filePath);
    }

    async downloadFile(req, res) {
        console.log('adawd')
        const {chapter, filename} = req.params;
        const filePath = path.join(__dirname, `../static/${chapter}`, filename);
        res.download(filePath, filename, (err) => {
            if (err) {
                console.error('Ошибка при скачивании файла:', err);
                res.status(500).send('Something went wrong');
            }
        });
    }

    async saveFile(req, res) {
        // const {filename} = req.params;

        // const que=`INSERT`
    }
}

module.exports = new FileController()