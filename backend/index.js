const express = require('express');
const app = express();
const PORT = 3001;
const connectDB = require('./Data/mongo');

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

connectDB();


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 