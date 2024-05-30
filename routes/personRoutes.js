const express=require('express');
const router=express.Router();
const Person=require('./../models/Person');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');


router.post('/signup',async (req,res)=>{

  try{

    const data=req.body;
    const newPerson= new Person(data);
    const response=await newPerson.save();
    console.log("data saved");

    const payload={
      id:response.id,
      username:response.username
    }
    const token=generateToken(payload);
    console.log(`token is: ${token}`);
    res.status(200).json({response:response,token:token});
  }catch(err){
    console.log(err);
    res.status(500).json({err:"internal server error"});
    }

});

router.post('/login', async(req,res)=>{
  try {
    const {username,password}=req.body;

  const user= await Person.findOne({username:username});

  if(!user || !(await user.comparePassword(password))){
    return res.status(401).json({error:"invalid username or password"});

  }

  const payload={
    id:user.id,
    username:user.username
  }

  const token=generateToken(payload);

  res.json({token:token});
    
  } catch (error) {
    console.log(error);
    res.status.json({error:"internal server error"});
    
  }

})

module.exports=router;


router.get('/',jwtAuthMiddleware,async (req,res)=>{
  try{
    const data= await Person.find();
    console.log("data fetched ");
    res.status(200).json(data);
    

  }catch(err){
    console.log(err);
    res.status(500).json({err:"internal server error"});

  }
})
router.get('/profile',jwtAuthMiddleware, async (req,res)=>{
  try {
     const userData=req.user;
    const userid=userData.id;

    const user=await Person.findById(userid);
    res.status(500).json(user);
    } catch (error) {
      console.log(error)
      res.status(500).json({error:"internal server error"});
    
  }
   

})


router.get('/:worktype',async(req,res)=>{
  try{
    const worktype=req.params.worktype;
    if(worktype==="chef" || worktype==="waiter" || worktype==="manager"){

      const response = await Person.find({work:worktype});
      console.log("data fetched");
      res.status(200).json(response);

    }else{
      res.status(404).json({error:"invalid work type"});
    }

  }catch(err){
    console.log(err);
    res.status(500).json({err:"internal server error"});
  }

})


router.put('/:id',async(req,res)=>{
    try{
        const personid=req.params.id;
        const updatedperson=req.body;

        const response= await Person.findByIdAndUpdate(personid,updatedperson,{
            new:true,
            runValidators:true
        });
        res.status(200).json(response);
        console.log("data updated")
       
        if(!response){
            res.status(404).json({error:"person not found"});
        }

    }
    catch(err){
        console.log(err);
         res.status(500).json({err:"internal server error"});
    }
})


router.delete('/:id',async(req,res)=>{
    try{
        const personid=req.params.id;
        const response= await Person.findByIdAndDelete(personid);
        res.status(200).json({message:`record is deleted`});

        if(!response){
            res.status(404).json({message:`person with id-${personid}   not found`});
        }

    }catch(err){
        console.log(err);
         res.status(500).json({err:"internal server error"});
    }
    



})