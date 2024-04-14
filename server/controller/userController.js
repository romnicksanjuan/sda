const User = require('../model/user')

const Register = async(req,res) =>{
    const {name,username,password} = req.body;

    try {
        const saveUser = new User({name,username,password})
        await saveUser.save();
        res.json({message:'registered success'})
        
    } catch (error) {
        console.error(error)
    }
}


module.exports = {Register}