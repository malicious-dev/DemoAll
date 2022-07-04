const express = require('express');
const app = express();



app.use(express.json());
const api = require('./routes/api');
app.use('/api/', api);



PORT = 3000;
app.get('/', (req, res) => {
  res.send('hello world');
})

app.listen(PORT, (req, res) => {
  console.log(`listening on port `+PORT)
})
