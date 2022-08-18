require('dotenv').config();
import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { route } from './routes';

const app: Application = express();

app.use(cookieParser());

const corsOptions = {
  origin: 'http://103.56.161.204:3000',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(helmet());
app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const url = 'mongodb://localhost:27017/chat-app';
mongoose.set('autoCreate', true);

mongoose
  .connect(url)
  .then(() => {
    console.log(`Connect to mongodb sucessffully!`);
  })
  .catch((err) => {
    console.log(`Connect to mongodb failed with: ${err}`);
  });

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

route(app);
