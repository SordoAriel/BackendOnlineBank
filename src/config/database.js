
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Conexión establecida con MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error en la conexión a MongoDB:', err);
});
