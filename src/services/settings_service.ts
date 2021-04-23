import { getCustomRepository, Repository } from 'typeorm';
import { Settings } from '../entities/settings';
import { SettingsRepository } from '../repositories/settings_repository';

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsService {
  private settingsRepository: Repository<Settings>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ chat, username }: ISettingsCreate) {
    const userAlreadyExists = await this.settingsRepository.findOne({
      username,
    });

    if (userAlreadyExists) {
      throw new Error('User already exists!');
    }

    const settings = this.settingsRepository.create({
      chat,
      username,
    });

    await this.settingsRepository.save(settings);

    return settings;
  }
}

export { SettingsService };
