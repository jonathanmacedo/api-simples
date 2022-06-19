require('dotenv').config()
const express = require('express')
const port = process.env.PORT || 5000
const app = express();
const router = require('./routes/router')


app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())
app.use('/books', router)

app.listen(port, () => {
    console.log(`O servidor está rodando na porta: ${port}`)
})