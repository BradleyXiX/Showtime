import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () =>{
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        mongoose.connection.on('connected', ()=> console.log('Database connected'));
        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/quickshow`).then((mongoose) => {
            return mongoose;
        });
    }
    
    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        cached.promise = null;
        console.error("MongoDB Connection Error: ", error.message);
        throw error;
    }
}

export default connectDB;