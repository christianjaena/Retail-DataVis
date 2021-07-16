const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const retailRoutes = require('./server/routes/retailRoutes')
const PORT = 5000

const app = express()

app.use(express.static('client'))
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/retail', retailRoutes)


app.listen(PORT, error => {
    if (error) throw error;
    console.log(`Server is listening at port ${PORT}`)
})