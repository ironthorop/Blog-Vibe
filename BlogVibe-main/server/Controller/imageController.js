
import grid from 'gridfs-stream';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const BASE_URL = process.env.BASE_URL

const url = `${BASE_URL}`
let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', ()=>{
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
         bucketName : 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
})
export const uploadImage = (req,res) =>{
    if(!req.file){
        return res.status(404).json({msg: "picture not Found"});
    }

    const imageUrl = `${url}file/${req.file.filename}`;

    return res.status(200).json(imageUrl);
}

export const getImage = async(request,response)=>{
         try{
            
            const file =  await gfs.files.findOne({filename : request.params.filename});
            
            const readStream =  gridfsBucket.openDownloadStream(file._id);
            
            readStream.pipe(response);
            
         }catch(error){
               return response.status(500).json({msg: error.message});
         }
}