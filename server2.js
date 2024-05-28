const express = require('express')
const app = express();
const db=require('./db');
const bodyParser=require("body-parser");
app.use(bodyParser.json());
const personRoutes=require("./routes/personRoutes");
const menuItemRoutes=require("./routes/menuItemRoutes"); 
app.use('/person',personRoutes);
app.use('/menuitem',menuItemRoutes);


app.get('/', function (req, res) {
  res.send('Hello World!!  This my first server with Nodejs');
})


app.listen(3000,()=>{
  console.log("listening on port 3000");
})






