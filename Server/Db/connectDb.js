const mongoose=require("mongoose")

const connectDb=()=>{
    mongoose.connect(process.env.DB_URL,{}).then((data)=>{
        console.log(`Mongoose connect with server: ${data.connection.host}`);
    })
}

module.exports=connectDb