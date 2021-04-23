import { Request, Response } from 'express';
import { UserService } from '../services/user_service';

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const userServices = new UserService();
    const user = await userServices.create(email);
    return response.json(user);
  }
}

export { UserController };
