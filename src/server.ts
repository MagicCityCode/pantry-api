import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import routes from './routes';

// debugger;
const envFound = dotenv.config();

if (!envFound) {
  throw new Error('env file not found');
}

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(routes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
