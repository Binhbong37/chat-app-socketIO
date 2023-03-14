const express = require('express');
const app = express();
const dotenv = require('dotenv');

const databaseConnect = require('./config/database');
const authRoute = require('./routes/authRoute');
const messengerRoute = require('./routes/messengerRoute');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
dotenv.config({
    path: 'backend/config/config.env',
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', authRoute);
app.use('/api', messengerRoute);

databaseConnect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
