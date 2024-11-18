import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';;
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Server } from 'socket.io';

@WebSocketGateway()
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('updateNotification')
  update(@MessageBody() dataNotification: UpdateNotificationDto) {
    this.server.emit("disponibility",{...dataNotification, available:true});
  } 

}
