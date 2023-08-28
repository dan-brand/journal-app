// --------------------------------- IMPORTS --------------------------------- //
const express = require('express');
const dotenv = require('dotenv');
const journalRouter = require('./routes/journalRoutes');
const userRouter = require('./routes/userRoutes');
const mongoose = require('mongoose');
const morgan = require('morgan');
const authenticateUser = require('./middleware/auth');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');
const path = require('path');

// --------------------------------- INITIALISE --------------------------------- //
const app = express();
dotenv.config();

// --------------------------------- PRE-ROUTE MIDDLEWARE --------------------------------- //

app.use(express.static(path.join(__dirname, './client/build'))); //needed for building static asset
app.use(express.json()) // converts raw JSON to a javascript object and accessible via req.body

if (process.env.NODE_ENV !== 'production') { 
    app.use(morgan('dev'))
}

// --------------------------------- ROUTES --------------------------------- //

app.use('/api/v1/user', userRouter);
app.use('/api/v1/journals', authenticateUser, journalRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
  });

// --------------------------------- POST-ROUTE MIDDLEWARE --------------------------------- //

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// --------------------------------- SERVER --------------------------------- //

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Listening on port 4000');
        })
    })
    .catch((error) => {
        console.log(error)
    })



