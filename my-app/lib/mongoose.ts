import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.NEXT_PUBLIC_MONGODB_URL) {
        return console.log('Missing NEXT_PUBLIC_MONGODB_URL');
    }

    if(isConnected) {
        console.log('MongoDB is already connected!');
        return;
    }

    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL, {
            dbName: 'SpringOverflow',
        })

        isConnected=true;
        console.log("Successfully connected to MongoDB!");

    } catch (error) {
        console.log(error)
    }
}