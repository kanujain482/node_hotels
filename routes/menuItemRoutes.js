const express=require('express');
const router=express.Router();
const MenuItem=require('./../models/MenuItem');




router.post('/',async (req,res)=>{
  try{
        const data=req.body;
        const newMenuItem=new MenuItem(data);
        const response= await newMenuItem.save();
        console.log("data saved");
        res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({err:"internal server error"});
  }
  
})


router.get('/',async (req,res)=>{
  try{

    const data= await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);

  }catch(err){
    console.log(err);
    res.status(500).json({err:"internal server error"});


  }
})

router.get('/:tastetype',async(req,res)=> {
 try{
     const tastetype=req.params.tastetype;
        if(tastetype==="spicy" || tastetype==="sour" || tastetype==="sweet")
        {
          const response= await MenuItem.find({taste:tastetype});
          console.log("data fetched");
          res.status(200).json(response);
        }
        else
        {
          res.status(404).json({error:"invalid tastetype "});
        }
 }
 catch(err){
    console.log(err);
    res.status(500).json({err:"internal server error"});
 }
  
});

router.put('/:id', async(req,res)=>{

    try{
        const itemid=req.params.id;
        const updatedmenuitem=req.body;

        const response= await MenuItem.findByIdAndUpdate(itemid,updatedmenuitem,{
            new:true,
            runValidators:true
        })

         if(!response){
            res.status(404).json({error:"menuitem not found"});
        }

        console.log("data updated");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({err:"internal server error"});
    }



})

router.delete('/:id', async (req,res)=>{
    try{

        const itemid=req.params.id;
        const response= await MenuItem.findByIdAndDelete(itemid);
        console.log("item deleted");
        if(!response){
            res.status(404).json({error:"menuitem not found"});
        }
        res.status(200).json({message:"item deleted"});
    }catch(err){
        console.log(err);
        res.status(500).json({err:"internal server error"});

    }
    


})

module.exports=router;