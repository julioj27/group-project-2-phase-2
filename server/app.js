const express = require('express');
const cors = require('cors');
const router = require('./routes/index');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});