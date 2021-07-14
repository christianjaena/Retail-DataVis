const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const PORT = 5000

const app = express()

app.use(morgan('dev'))
app.use(cors())


app.listen(PORT, error => {
    if (error) throw error;
    console.log(`Server is listening at port ${PORT}`)
})