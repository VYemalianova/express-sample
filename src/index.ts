import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import { errorHandler } from './middlewares/error-handler';
import authRoutes from './routes/auth.routes';
import horoscopeRoutes from './routes/horoscope.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/horoscope', horoscopeRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
