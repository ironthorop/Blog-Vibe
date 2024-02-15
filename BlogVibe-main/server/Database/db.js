import mongoose from "mongoose";

const Connection = async(URL)=>{
  // const URL = "mongodb://127.0.0.1:27017/mern-blog-app"
try{
  await mongoose.connect(URL, {useNewUrlParser: true});
  console.log('Database connected Successfully');
}catch(e){
  console.log("Error while Connecting to Database", e.message);
}
}

export default Connection;