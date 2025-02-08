import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI);
        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Connected to mongo cluster: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Could not connect to mongo cluster: ${error.message}`);
    }
};

export default connectDB