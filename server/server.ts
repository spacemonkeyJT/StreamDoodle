import express from 'express';
import cors from 'cors';
import path from 'path';
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API route
app.get('/api/test', (req, res) => {
  res.send({ message: 'Hello from back end!' });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.status(404).send({});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
