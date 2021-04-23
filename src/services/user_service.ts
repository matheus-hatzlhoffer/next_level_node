import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/user_respository';

class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async create(email: string) {
    const userAlreadyExists = await this.userRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      return userAlreadyExists;
    }

    const user = this.userRepository.create({
      email,
    });

    await this.userRepository.save(user);

    return user;
  }
}

export { UserService };
