import { Router } from 'express';
import { SettingsController } from './controllers/settings_controller';

const Routes = Router();

/**
 * Routes params => https://localhost:3333/settings/1
 * Query params - filtros e buscas => https://localhost:3333/settings/1?search=algumacoisa&outracoisa
 * Body params - envia objetos json na requisição
 */
const settings_controller = new SettingsController();

Routes.post('/settings', settings_controller.create);

export { Routes };
