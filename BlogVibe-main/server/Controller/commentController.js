
import Comment from "../Model/comment.js"
export const newComment = async(req, res)=>{
   try{
    const data = await new Comment(req.body);
      data.save();

      return res.status(200).json({msg: 'Comment saved successfully'})
   }catch(e){
       return res.status(500).json({e: e.message});
   }
}

export const getComments  = async(req,res)=>{
    try{
         const comment = await Comment.find({postId: req.params.id});
        return  res.status(200).json(comment);
    }catch(e){
        return res.status(500).json({e:e.message});
    }
}

export const deleteComment  = async(req,res)=>{
    try{
         const comment = await Comment.findByIdAndDelete(req.params.id);
        return  res.status(200).json({msg: "comment deleted"});
    }catch(e){
        return res.status(500).json({e:e.message});
    }
}