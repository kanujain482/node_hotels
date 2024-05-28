const express=require('express');
const router=express.Router();
const Person=require('./../models/Person');

router.post('/',async (req,res)=>{

  try{

    const data=req.body;
    const newPerson= new Person(data);
    const response=await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({err:"internal server error"});
    }

});

module.exports=router;


router.get('/',async (req,res)=>{
  try{
    const data= await Person.find();
    console.log("data fetched ");
    res.status(200).json(data);
    

  }catch(err){
    console.log(err);
    res.status(500).json({err:"internal server error"});

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