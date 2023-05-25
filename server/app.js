const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
const cors = require('cors')
require('dotenv').config();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(cors())
app.use(express.json())
app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`)
});

