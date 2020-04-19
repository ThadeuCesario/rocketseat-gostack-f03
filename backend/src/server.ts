import express, { response } from 'express';

const app = express();

app.get('/', (request, response) => {
  response.json({message: "Hello TypeScript Project!!!!"})
});

app.listen(3333, () => {
  console.log('👾️ Backend server started! 👾️');
});
