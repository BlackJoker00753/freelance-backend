import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { User } from '../user/user.entity';
import { Job } from '../jobs/jobs.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async sendMessage(
    sender: User,
    receiver: User,
    job: Job,
    message: string,
  ): Promise<Chat> {
    const chatMessage = this.chatRepository.create({
      sender,
      receiver,
      job,
      message,
    });
    return this.chatRepository.save(chatMessage);
  }

  async getMessages(jobId: string): Promise<Chat[]> {
    return this.chatRepository.find({
      where: { job: { id: jobId } },
      relations: ['sender', 'receiver', 'job'],
      order: { timestamp: 'ASC' },
    });
  }
}
