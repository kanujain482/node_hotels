const passport=require('passport');
const localStrategy=require('passport-local');
const Person=require('./models/Person');


passport.use(new localStrategy(async (username,password,done)=>{
  try {
    console.log('Received credentials',username,password);
    const user = await Person.findOne({username:username});
    if(!user){
      return done(null,false,{message:"incorrect username"});
    }
    const isPasswordMatch= await user.comparePassword(password);
    if(isPasswordMatch){
      return done(null,user);
    }else{
      return done(null,false,{message:"incorrect password"});
    }

  } catch (error) {
    return done(error);
    
  }


}))

module.exports=passport;