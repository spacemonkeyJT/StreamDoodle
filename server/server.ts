import express from 'express';
import cors from 'cors';
import path from 'path';
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API route
app.get('/api', (req, res) => {
  res.send({ message: 'Hello from back end!' });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
