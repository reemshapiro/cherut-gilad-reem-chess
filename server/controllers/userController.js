const User = require("../models/userModel");


exports.login = async (req, res) => {
    try{
        
        const { username, password } = req.body
        console.log(`testing ${username},${password}`)
    
        const user = await User.findOne({username});
          if ( !user || user.password !==password){
              throw new Error('unable to login')
          }
          console.log('line14 usercontroller.js')
          console.log(user.username)
          
         res.cookie(`userID`,user.username,{ httpOnly: false })
    
        res.status(200).send({ ok:true,user});
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)}


}
exports.signup = async (req, res) => {  ///on client post
    try{
        
    const newUser = await User.create(req.body)
    res.status(201).send({ ok:true,newUser});
    }catch(err){console.log(err)
        res.status(500).send({ ok: false, err});  
    }

    
}
