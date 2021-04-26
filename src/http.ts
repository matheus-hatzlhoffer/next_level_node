import express, { request, response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import './database';
import path from 'path';
import { Routes } from './routes';

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/pages/client', (request, response) => {
  return response.render('html/client.html');
});

/**
 * GET = Buscas
 * Post = Criação
 * Put =  alteração
 * Delete = Deletar
 * Patch = alterar uma informação específica
 */
const http = createServer(app);
const io = new Server(http);
io.on('connection', (socket: Socket) => {
  console.log('se conectou', socket.id);
});
app.use(express.json());
app.use(Routes);

export { http, io };
