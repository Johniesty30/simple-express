import mongoose from "mongoose";

export const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to mongo");
    }
    catch(error){
        console.error("error connect to MongoDb", error);
        process.exit(1); //Exit with faliure
    }
}

