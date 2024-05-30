const express = require('express')
const app = express();
const db=require('./db');
const bodyParser=require("body-parser");
app.use(bodyParser.json());
const personRoutes=require("./routes/personRoutes");
const menuItemRoutes=require("./routes/menuItemRoutes"); 
require('dotenv').config();
const passport=require('./auth');



const PORT=process.env.PORT || 3000;


const logRequest=(req,res,next)=>{
  console.log(`${new Date().toLocaleString()} Request Made to ${req.originalUrl}`);
  next();
}





app.use(logRequest);






app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false});

app.get('/',function (req, res) {
  res.send('Hello World!!  This my first server with Nodejs');
})

// app.use('/person',localAuthMiddleware,personRoutes);
app.use('/person',personRoutes);
app.use('/menuitem',menuItemRoutes);



app.listen(PORT,()=>{
  console.log(`listening on port ${PORT}`);
})






