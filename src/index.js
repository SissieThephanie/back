import express from 'express';
import cors from 'cors';
import venteRoute from './routes/venteRoute.js';

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

app.use('/api', venteRoute);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
