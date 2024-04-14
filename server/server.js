const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/userRoute')
const app = express()


mongoose.connect('mongodb+srv://romnick:1234@romnickdb.e14diyv.mongodb.net/mobile-dev')
.then(() => console.log('connected to database'))
app.use(express.json())
app.use('/', router)

app.get('/', (req,res) =>{
    res.json('welcome page')
})


app.listen(3000, () =>{
    console.log('server is running')
})