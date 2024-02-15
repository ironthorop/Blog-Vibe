import User from "../Model/user.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
import Token from "../Model/Token.js";
dotenv.config();
export const signupUser = async (req, res) =>{
       try{
           const salt = await bcrypt.genSalt();
           const hashedPassword = await bcrypt.hash(req.body.password, salt)
           const user = {username : req.body.username , name: req.body.name, password: hashedPassword};
           const newUser = new User(user);
           await newUser.save();
           return res.status(200).json({msg:'SignUp succesfull'})
         
       }catch(e){
         return res.status(500).json({e: e.message});
       }
}
export const loginUser = async (req,res) =>{
    
    try{
      let user = await User.findOne({username: req.body.username});
    
    if(!user){
     return res.status(404).json({msg: "username does not exist"});
    }
      let match =  await bcrypt.compare(req.body.password, user.password);;
      if(match){
         
         const accessesToken = jwt.sign(user.toJSON(), process.env.ACCESSES_SECRET_KEY, {expiresIn: '15m'} );
         const refreshToken =  jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
   
               const newToken = new Token({token:refreshToken, name:user.name, username:user.username})
               await newToken.save();
             
               return res.status(200).json({ accessesToken:accessesToken , refreshToken: refreshToken, name: user.name, username: user.username})

       }else{
        return res.status(404).json({msg: "Password does not match"})
       }

    }catch(e){
          return res.status(501).json({msg:"error while login"})
       }
}