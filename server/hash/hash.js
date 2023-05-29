const bcrypt = require('bcrypt');

const hash = {
    async toHash(password) {
        console.log(password)
        // const saltRounds = 2;
        // const salt = await bcrypt.genSaltSync(saltRounds)
        return {hashPassword:bcrypt.hashSync(password, process.env.SALT_SECRET)}
    },
    async comparePassword(password, hash) {
        return bcrypt.compare(password.toString(), hash);
    }

}
module.exports = {hash}