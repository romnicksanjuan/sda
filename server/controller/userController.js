const User = require('../model/user')

const Welcome = (req,res) =>{
    res.json({message:'This is Welcome Page'})
}

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

const Login = async(req,res) =>{
    const {username, password} = req.body;

    try {
        const checkUsername = await User.findOne({username})

        if(checkUsername){
            if(checkUsername.password !== password){
                return res.json({message:'Username or Password Incorrect'})
            }
        }else{
            return res.json({message:'Username or Password Incorrect'})
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {Register,Welcome,Login}