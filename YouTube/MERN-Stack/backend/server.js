require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutsRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// Create express app
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log('This should be logged first')
    console.log(req.path, req.method)
    next()
})

// Routes
app.get('/', (req, res) => {
    console.log('This should be logged second')
    res.json({ message: 'Welcome to the app' })
})

app.use('/api/workouts', workoutsRoutes)
app.use('/api/user', userRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB')

        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Listening on port', process.env.PORT)
        })

    })
    .catch(err => console.log(err))