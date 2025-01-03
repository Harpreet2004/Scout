import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"


export const connectDb = async () => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        
        console.log(`\n MONGODB CONNECTED !! DB HOST : ${connectInstance.connection.host}`)
    } catch (error) {
        console.log("MONGO DB CONNECTION ERROR!!", error);
        process.exit(1);
    }
}

export default connectDb;