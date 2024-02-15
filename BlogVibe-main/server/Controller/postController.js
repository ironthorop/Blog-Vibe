import Post from "../Model/post.js"


export const createPost = async(req,res) => {
   try{
    const post =  await new Post(req.body);
    post.save();

    return res.status(200).json("Post save successfully")
   }catch(e){
        red.status(500).json()
   }
}

export const getAllPosts = async (req, res) =>{
   let category = req.query.category;
  
   let post;
   try{
      if(category){
          post = await Post.find({categories : category})
      }else{
          post = await Post.find({});
      }
     return res.status(200).json(post);
   }catch(e){
      return res.status(500).json({msg: e.message})
   }
}

export const getPostById = async(req, res)=>{
   try{
   const post = await Post.findById(req.params.id);
   return res.status(200).json(post);

   }catch(e){
      return res.status(500).json({msg: e.message})
   }
}

export const updatePost = async(req, res)=>{
   try{
        const post = await Post.findById(req.params.id);
        if(!post){
         return res.status(404).json({msg: 'post not found'});
        }
        await Post.findByIdAndUpdate(req.params.id, {$set: req.body})
        return res.status(200).json({msg: "post updated successfully" })
   }catch(e){
         res.status(500).json({e : e.message})
   }
}

export const deletePost = async(req, res)=>{
   try{  
         const post = await Post.findById(req.params.id);
         if(!post){
            return res.status(404).json({msg: 'post not found'})
         }
         await Post.findByIdAndDelete(post._id);
         return res.status(200).json({msg: "Post deleted successfully"})
   }catch(e){
          return res.status(500).json({e: e.message})
   }
}