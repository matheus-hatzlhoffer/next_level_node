import express, { request, response } from 'express';
import './database';
import { Routes } from './routes';

const app = express();

/**
 * GET = Buscas
 * Post = Criação
 * Put =  alteração
 * Delete = Deletar
 * Patch = alterar uma informação específica
 */
app.use(express.json());
app.use(Routes);

app.listen(3333, () => console.log('Server is running in port 3333'));
