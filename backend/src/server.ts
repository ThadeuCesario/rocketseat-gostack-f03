import express from 'express';

const app = express();

app.get('/', (request, response) => response.json({ message: 'Hello Hello Hello Hello hELLO' }));

app.listen(3333, () => {
  console.log('Backend start on port 3333');
});
