import express from "express";
import { signupUser, loginUser } from "../Controller/usercontroler.js";
import { uploadImage, getImage } from "../Controller/imageController.js";
import { createPost , getAllPosts, getPostById , updatePost , deletePost} from "../Controller/postController.js";
import  upload  from "../utils/upload.js";
import { authenticateToken } from "../Controller/jwt-Controller.js";
import { newComment , getComments, deleteComment} from "../Controller/commentController.js";
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);
router.post('/create', authenticateToken, createPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id' ,authenticateToken, getPostById);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);
router.post('/comment/new' , authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments );
router.get('/comments', (req, res)=>{
    return res.status(200).json({msg: "Unuse Request"})
});
router.delete('/comment/delete/:id', authenticateToken, deleteComment)



export default router;