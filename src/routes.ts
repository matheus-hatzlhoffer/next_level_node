import { Router } from 'express';
import { MessageContoroller } from './controllers/messages_controller';
import { SettingsController } from './controllers/settings_controller';
import { UserController } from './controllers/users_controller';

const Routes = Router();

/**
 * Routes params => https://localhost:3333/settings/1
 * Query params - filtros e buscas => https://localhost:3333/settings/1?search=algumacoisa&outracoisa
 * Body params - envia objetos json na requisição
 */
const settings_controller = new SettingsController();
const users_controller = new UserController();
const message_controller = new MessageContoroller();

Routes.post('/settings', settings_controller.create);
Routes.post('/users', users_controller.create);
Routes.post('/messages', message_controller.create);
Routes.get('/messages/:id', message_controller.showByUser);

export { Routes };
