import { Response, Request } from 'express';
import { SettingsService } from '../services/settings_service';

class SettingsController {
  async create(request: Request, response: Response) {
    const { chat, username } = request.body;

    const settingsService = new SettingsService();
    try {
      const settings = await settingsService.create({ chat, username });

      return response.json(settings);
    } catch (e) {
      return response.status(400).json({
        message: e.message,
      });
    }
  }
}

export { SettingsController };
