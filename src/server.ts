import express, { request, response } from 'express';
import './database';

const app = express();

/**
 * GET = Buscas
 * Post = Criação
 * Put =  alteração
 * Delete = Deletar
 * Patch = alterar uma informação específica
 */

app.get('/', (request, response) => {
  return response.send('Hello World');
});

app.post('/users', (request, response) => {
  return response.json({ message: 'Usuário salvo com sucesso!!' });
});

app.listen(3333, () => console.log('Server is running in port 3333'));
