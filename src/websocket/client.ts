import { io } from '../http';
import { ConnectionService } from '../services/connection_service';
import { MessageService } from '../services/message_service';
import { UserService } from '../services/user_service';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const connectionService = new ConnectionService();
  const userService = new UserService();
  const messageService = new MessageService();
  let user_id = null;
  socket.on('client_first_access', async (params) => {
    const socket_id = socket.id;
    const { text, email } = params;
    const userExists = await userService.findByEmail(email);
    if (!userExists) {
      const user = await userService.create(email);
      user_id = user.id;
      await connectionService.create({
        socket_id,
        user_id: user.id,
      });
    } else {
      user_id = userExists.id;
      const connection = await connectionService.findByUserId(userExists.id);
      if (!connection) {
        await connectionService.create({
          socket_id,
          user_id: userExists.id,
        });
      } else {
        connection.socket_id = socket_id;
        await connectionService.create(connection);
      }
    }

    await messageService.create({
      text,
      user_id,
    });

    const allMessages = await messageService.listByuser(user_id);

    socket.emit('client_list_all_messages', allMessages);

    const allUsers = await connectionService.findAllWithoutAdmin();
    io.emit('admin_list_all_users', allUsers);
  });

  socket.on('client_send_to_admin', async (params) => {
    const { text, socket_admin_id } = params;
    const socket_id = socket.id;
    const { user_id } = await connectionService.findBySocketId(socket_id);
    const message = await messageService.create({
      text,
      user_id,
    });

    io.to(socket_admin_id).emit('admin_receive_message', {
      message,
      socket_id,
    });
  });
});
