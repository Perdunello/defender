const db = require('../DB')
const tokens = require("../tokens/tokens");
const {hash} = require("../hash/hash");


class LoginisationController {
    async signup(req, res) {
        const {name, last_name, email, password} = req.body
        const isExistAccountQue = `SELECT COUNT(*) FROM users WHERE email='${req.body.email}'`
        await db.query(isExistAccountQue, async (err, response) => {
            if (err) {
                res.status(500).json({message: 'Something went wrong'})
                throw err
            } else if (response[0]['COUNT(*)'] === 0) {
                hash.toHash(password).then(async response => {
                    const que = `INSERT INTO users(user_id, name, last_name, email, password, refresh_token) 
                        VALUES (NULL,'${name}','${last_name}','${email}','${response.hashPassword}','123')`
                    await db.query(que, async (err, response) => {
                        if (err) {
                            res.status(500).json({message: 'Something went wrong'})
                            throw err
                        } else {
                            const accessToken = await tokens.generateAccessToken(response.insertId) //create couple of tokens and set it in db
                            const refreshToken = await tokens.generateRefreshToken(response.insertId)
                            const refreshQue = `UPDATE users SET refresh_token='${refreshToken}' WHERE user_id=${response.insertId}`
                            await db.query(refreshQue, (err, responseRefresh) => {
                                if (err) {
                                    throw err
                                } else {
                                    res.cookie('accessToken', accessToken, {maxAge: 900000,})
                                    res.cookie('refreshToken', refreshToken, {maxAge: 2592000000, httpOnly: true})

                                    res.status(200).json({
                                            userId: response.insertId, ...req.body,
                                        }
                                    )
                                }
                            })
                        }
                    })
                })
            } else {
                res.status(200).json({message: 'Account with this email already exists'})
            }
        })
    }

    async login(req, res) {
        const isExistAccountQue = `SELECT COUNT(*) FROM users WHERE email='${req.body.email}'`
        await db.query(isExistAccountQue, async (err, response) => {
            if (err) {
                res.status(500).json({message: 'Something went wrong'})
                throw err
            } else if (response[0]['COUNT(*)'] > 0) {
                const que = `SELECT * FROM users WHERE email='${req.body.email}'`
                await db.query(que, async (err, response) => {//get password for compare password from DB and client
                    if (err) {
                        res.status(500).json({message: 'Something went wrong'})
                        throw err
                    } else {
                        hash.comparePassword(req.body.password, response[0].password).then(async responseCompare => {
                            if (responseCompare) {//if true=> create couple of tokens and send to client
                                const {user_id, name, last_name, email} = response[0]
                                const accessToken = await tokens.generateAccessToken(response[0].user_id) //create couple of tokens and set it in db
                                const refreshToken = await tokens.generateRefreshToken(response[0].user_id)
                                const refreshQue = `UPDATE users SET refresh_token='${refreshToken}' WHERE user_id=${response[0].user_id}`
                                await db.query(refreshQue, (err, responseRefresh) => {
                                    if (err) {
                                        throw err
                                    } else {
                                        res.cookie('accessToken', accessToken, {maxAge: 900000,})
                                        res.cookie('refreshToken', refreshToken, {maxAge: 2592000000, httpOnly: true})
                                        res.status(200).json({
                                                user_id, name, last_name, email
                                            }
                                        )
                                    }
                                })
                            }
                        });
                    }
                })
            } else {
                res.status(200).json({message: 'Incorrect login or password'})
            }
        })

    }

    async autoLogin(req, res) {
        const token = tokens.verifyToken(req.cookies.accessToken, process.env.ACCESS_SECRET)
        if (Math.floor(Date.now() / 1000) >= token.exp) {
            res.status(401).json({message: 'Failed to auto login'})
        } else {
            const que = `SELECT * FROM users WHERE user_id=${token.userId}`
            await db.query(que, async (err, response) => {
                const {user_id, name, last_name, email} = response[0]
                res.status(200).json({
                        user_id, name, last_name, email
                    }
                )
            })
        }

    }

    async logout(req, res) {
        res.clearCookie('refreshToken', {httpOnly: true})
        res.clearCookie('accessToken')
        res.status(200).json({
            message: 'Account was left'
        })
    }

    async refresh(req, res) {
        if (req.cookies.refreshToken) {//if refreshToken is exist=>create access and send to client
            const token = tokens.verifyToken(req.cookies.refreshToken, process.env.REFRESH_SECRET)
            if (token) {
                const que = `SELECT refresh_token FROM users WHERE user_id='${token.userId}'`
                await db.query(que, async (err, response) => {
                    if (err) {
                        res.status(500).json({message: 'Something went wrong'})
                        throw err
                    } else if (response[0].refresh_token === req.cookies.refreshToken) {//compare with db refresh token
                        if (Math.floor(Date.now() / 1000) >= token.exp) {//if refreshToken is end=>send message to login
                            res.json({message: 'You need to login'})
                        } else {
                            const accessToken = await tokens.generateAccessToken(token.userId) //else =>create access token and send to client
                            res.cookie('accessToken', accessToken, {maxAge: 900000})
                            res.status(200).json({message: 'Token was refreshed successful'})
                        }
                    } else {
                        res.status(401).json({message: 'Invalid refresh token'})
                    }
                })
            }

        } else {//id refreshToken isn`t exist=> send message to client
            return res.json({message: 'You need to login'})
        }
    }
}

module.exports = new LoginisationController()