import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './jobs.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    private userService: UserService,
  ) {}

  async createJob(createJobDto: CreateJobDto, userId: string): Promise<Job> {
    const client = await this.userService.findOne(userId);
    if (client.role !== 1) {
      throw new UnauthorizedException('Only clients can create jobs');
    }

    const job = this.jobRepository.create({
      ...createJobDto,
      client,
    });

    return this.jobRepository.save(job);
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({
      where: { id },
      relations: ['client'],
    });
    if (!job) {
      throw new NotFoundException(`Job with ID "${id}" not found`);
    }
    return job;
  }

  async findJobsByClient(clientId: string): Promise<Job[]> {
    return this.jobRepository.find({
      where: { client: { id: clientId } },
      relations: ['client'],
    });
  }

  async updateJob(
    id: string,
    updateJobDto: UpdateJobDto,
    userId: string,
  ): Promise<Job> {
    const job = await this.findOne(id);
    if (job.client.id !== userId) {
      throw new UnauthorizedException('You can only edit your own jobs');
    }

    Object.assign(job, updateJobDto);
    return this.jobRepository.save(job);
  }

  async deleteJob(id: string, userId: string): Promise<void> {
    const job = await this.findOne(id);
    if (job.client.id !== userId) {
      throw new UnauthorizedException('You can only delete your own jobs');
    }

    await this.jobRepository.remove(job);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: Job[]; count: number }> {
    const [data, count] = await this.jobRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['client'],
    });

    return { data, count };
  }
}
