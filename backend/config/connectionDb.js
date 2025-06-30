const mongoose=require("mongoose")

const connectDb=async()=>{
    await mongoose.connect(process.env. MONGO_URI)
    .then(()=>console.log("connected..."))
}

module.exports=connectDb