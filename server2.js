const express = require('express')
const app = express();
const db=require('./db');
const bodyParser=require("body-parser");
app.use(bodyParser.json());
const personRoutes=require("./routes/personRoutes");
const menuItemRoutes=require("./routes/menuItemRoutes"); 
app.use('/person',personRoutes);
app.use('/menuitem',menuItemRoutes);

require('dotenv').config();


const PORT=process.env.PORT || 3000;


app.get('/', function (req, res) {
  res.send('Hello World!!  This my first server with Nodejs');
})


app.listen(PORT,()=>{
  console.log(`listening on port ${PORT}`);
})






