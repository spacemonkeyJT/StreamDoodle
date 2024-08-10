import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import { registerAuthRoutes } from './auth';
import { DEV } from './constants';
import proxy from 'express-http-proxy';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

registerAuthRoutes(app);

if (DEV) {
  // In dev mode, proxy the page requests to the running vite server
  app.use('/', proxy('http://localhost:3000'));
} else {
  // In production, serve the static build files
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
