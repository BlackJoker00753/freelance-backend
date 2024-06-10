import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { UserModule } from '../user/user.module'; // Import UserModule
import { JobsModule } from '../jobs/jobs.module'; // Import JobModule

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), UserModule, JobsModule],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
