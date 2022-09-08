import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { route } from './routes';
import { env } from './utils/myVariable';

const app: Application = express();

app.use(cookieParser());

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
// };

app.use(cors());

app.use(helmet());
app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const url = "mongodb://" + env.dbUserName + ":" + env.dbPassword + "@" + env.dbHostName + ":" + env.dbPort + "/" + env.dbName + "";
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
