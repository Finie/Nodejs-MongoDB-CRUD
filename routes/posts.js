const express = require('express');
const PostSchema = require('../models/PostModel');
const route = express.Router();

//get all documents from the database
route.get('/get-docs',async(req,res)=>{
  try{
const posts = await PostSchema.find();
   res.status(200).json(posts)
  }
  catch(err){
      res.status(401).json({message:err});
  }
});

//get a specific doc from the database
route.get('/get-specific-doc/:postId',async (req,res)=>{
    try{
        const posts = await PostSchema.findById(req.params.postId);
        res.status(200).json(posts);
    }
    catch(err){
     res.status(401).json({message:err});   
    }

});

//post a document to the database
route.post('/post-doc', async(req,res) => {
   const post = new PostSchema({
       title: req.body.title,
       description: req.body.description
   });

   try{
   const savePost = await post.save();
   res.json(savePost);
    }
catch(err){
    res.status(401).json({message:err})
}
});

//update a document saved on the database

route.patch('/update-doc/:id', async (req,res)=>{
    try{
        if(req.body.title !== null && req.body.description !== null){
            const updatedDoc = await PostSchema.updateOne(
                {_id:req.params.id},
                {$set: {title:req.body.title}},
                {$set: {description:req.body.description}}
                );
               return res.status(200).json(updatedDoc);
        }
        else if(req.body.description !== null && req.body.title === null){
            const updatedDoc = await PostSchema.updateOne(
                {_id:req.params.id},
                {$set: {description:req.body.description}}
                );    
               return res.status(200).json(updatedDoc);
        }
        else if(req.body.description === null && req.body.title !== null){
            const updatedDoc = await PostSchema.updateOne(
                {_id:req.params.id},
                {$set: {title:req.body.title}}
                );    
               return res.status(200).json(updatedDoc);
        }
    else{
        res.status(400).json({message:"Sorry both title and description cannot be empty"})
    }
}
    catch(err){
        res.status(401).json({message:err});
    }
});

//deleting a document from the db
route.delete('/delete-doc/:id',async (req,res)=>{
    try{
    const deletedPost = await PostSchema.remove({_id:req.params.id});
    res.status(200).json(deletedPost);
    }
    catch(err){
        res.status(401).json({message:err});
    }
});
module.exports = route;