const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const db = require('./routes/db-config');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const PORT = process.env['PORT']
const dotenv = require('dotenv').config();

app.use('/js', express.static(__dirname + "/public/js"));
app.use('/css', express.static(__dirname + "/public/css"));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cookie());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.use("/", require('./routes/pages'));
app.use('/api', require('./controllers/auth'))
app.use('/profile', express.static(__dirname + "/public/profile"))
db.connect((err)=>{
    if (err) throw err;
    console.log('Database connected.')
})



app.listen(PORT, ()=>{
    console.log(`App running at Port ${PORT}`)
})