import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  Get,
  Patch,
  Delete,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { JobService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Job } from './jobs.entity';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createJob(
    @Body() createJobDto: CreateJobDto,
    @Request() req,
  ): Promise<Job> {
    const userId = req.user.userId;
    return this.jobService.createJob(createJobDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-jobs')
  async findMyJobs(@Request() req): Promise<Job[]> {
    const userId = req.user.userId;
    return this.jobService.findJobsByClient(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getJobById(@Param('id') id: string, @Request() req): Promise<Job> {
    const job = await this.jobService.findOne(id);
    if (job.client.id !== req.user.userId) {
      throw new UnauthorizedException('You can only view your own jobs');
    }
    return job;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateJob(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @Request() req,
  ): Promise<Job> {
    const userId = req.user.userId;
    return this.jobService.updateJob(id, updateJobDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteJob(@Param('id') id: string, @Request() req): Promise<void> {
    const userId = req.user.userId;
    return this.jobService.deleteJob(id, userId);
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<{ data: Job[]; count: number }> {
    return this.jobService.findAll(Number(page), Number(limit));
  }
}
