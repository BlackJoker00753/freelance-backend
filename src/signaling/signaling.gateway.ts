import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Replace '*' with your frontend URL to restrict access
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class SignalingGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('signal')
  handleSignal(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
    client.broadcast.emit('signal', data);
  }
}
