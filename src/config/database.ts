import mongoose, { ConnectOptions } from "mongoose";

export async function connDB():Promise<void> {
  try {
    const mongoURL: string = process.env.MONGO_URL || 'mongodb://localhost:27017/';
    const mongoDBName: string = process.env.MONGO_DB_NAME || 'test';
    await mongoose.connect(`${mongoURL}/${mongoDBName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auth: {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASS
      }
    } as ConnectOptions);
    console.log('Conexión establecida con MongoDB ');

  } catch (error) {
    console.log('Error en la conexión a MongoDB', error);
    process.exit();
  }
}
