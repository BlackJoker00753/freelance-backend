import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { JobService } from '../jobs/jobs.service';

@Controller('chats')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
    private readonly jobService: JobService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async sendMessage(
    @Body('receiverId') receiverId: string,
    @Body('jobId') jobId: string,
    @Body('message') message: string,
    @Request() req,
  ) {
    const sender = await this.userService.findOne(req.user.userId);
    const receiver = await this.userService.findOne(receiverId);
    const job = await this.jobService.findOne(jobId);

    return this.chatService.sendMessage(sender, receiver, job, message);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':jobId')
  async getMessages(@Param('jobId') jobId: string) {
    return this.chatService.getMessages(jobId);
  }
}
