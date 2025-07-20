import mongoose from "mongoose";

const Connection ={};

async function dbConnect(){
    if(Connection.isConnected){
        console.log("already connected");
        return ;
    }

    try{
        const db =await mongoose.connect(process.env.MONGODB_URI ||"",{});

        Connection.isConnected = db.connections[0].readyState;
        console.log("Connected")
    }catch(error){
        console.error("Error connecting to db", error)
    }
}

export default dbConnect;