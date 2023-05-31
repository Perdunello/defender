const express = require('express')
require('dotenv').config();
const PORT = process.env.PORT || 3002
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const loginisationRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const fileRouter = require("./routes/file.route");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true,}))
app.use(express.json())
app.use('/auth', loginisationRouter)
app.use('/files', fileRouter)


app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`)
});

