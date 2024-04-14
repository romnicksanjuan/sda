const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/userRoute')
const app = express()


mongoose.connect('mongodb+srv://romnick:1234@romnickdb.e14diyv.mongodb.net/mobile-dev')
.then(() => console.log('connected to database'))
app.use(express.json())
// app.use('/', router)

app.get('/', (req,res) =>{
    res.json('welcome page')
})

app.get('/register',async (req,res) =>{
    const {name,username,password} = req.body;

    try {
        const saveUser = new User({name,username,password})
        await saveUser.save();
        res.json({message:'registered success'})
        
    } catch (error) {
        console.log(error)
    }
})

app.listen(3000, () =>{
    console.log('server is running')
})