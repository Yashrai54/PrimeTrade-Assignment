const express=require('express');

const mongoose=require('mongoose');
const connectDb=async()=>{
    try{
        const res=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('Database connected:',res.connection.host);
    }catch(err){
        console.error('Database connection error:',err);
    }
}
module.exports=connectDb;