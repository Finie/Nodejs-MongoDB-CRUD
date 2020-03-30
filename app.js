const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');


//import routes
const postRoutes = require('./routes/posts');
//using a middle ware on any request
app.use(bodyParser.json());

//using imported route as a middleware
app.use('/posts',postRoutes);  //postRoutes is used whenever /post is hit


//connect to database
mongoose.connect(process.env.DB_URL,{useUnifiedTopology:true,useNewUrlParser:true},()=>{
    console.log("connected to mongoDB");
});

//start listening for the server
app.listen(3000);