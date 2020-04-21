import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({message: 'Hello Thadeu'});
});

app.listen(3333, () => {
  console.log('Backend start on port 3333');
});