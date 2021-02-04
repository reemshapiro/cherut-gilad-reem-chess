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

exports.updateUser = async (req, res) => {
    try {

    let loser = await User.find({username:req.body.loser.username});  
    let loserNOGP = loser[0].NOGP;  
    let updateLoser = await User.findOneAndUpdate({username:req.body.loser.username}, {NOGP:loserNOGP+1});

    let winner = await User.find({username:req.body.winner.username});  
    let winnerNOGP = winner[0].NOGP;  
    let winnerVictories = winner[0].victories ; 
    let updateWinner = await User.findOneAndUpdate({username:req.body.winner.username}, {NOGP:winnerNOGP+1,victories:winnerVictories+1});
    // let user = await User.findOneAndUpdate({username:req.body.winner.username}, {NOGP:user.NOGP+1});
    // const user = await User.find({ username: req.body.winner.username}).snapshot().forEach((doc) => {
    //     doc.NOGP = doc.NOGP + 1;
    //     User.save(doc);
    // });

      res.status(200).send({ updateLoser,updateWinner});
    } catch (err) {
      res.status(404).send({ jk:'kgk' });
    }
  };
