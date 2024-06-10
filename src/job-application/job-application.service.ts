import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from './job-application.entity';
import { UserService } from '../user/user.service';
import { JobService } from '../jobs/jobs.service';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplication)
    private jobApplicationRepository: Repository<JobApplication>,
    private userService: UserService,
    private jobService: JobService,
  ) {}

  async applyForJob(userId: string, jobId: string, proposal: string): Promise<JobApplication> {
    const user = await this.userService.findOne(userId);
    if (user.role !== 2) {
      throw new UnauthorizedException('Only freelancers can apply for jobs');
    }

    const job = await this.jobService.findOne(jobId);
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    const client = job.client;

    const existingApplication = await this.jobApplicationRepository.findOne({
      where: { user: { id: userId }, job: { id: jobId } },
    });

    if (existingApplication) {
      throw new BadRequestException('You have already applied for this job');
    }

    const application = this.jobApplicationRepository.create({
      user,
      job,
      client,
      proposal,
    });

    return this.jobApplicationRepository.save(application);
  }

  async getApplicationsForJob(jobId: string, userId: string): Promise<JobApplication[]> {
    const job = await this.jobService.findOne(jobId);
    if (job.client.id !== userId) {
      throw new UnauthorizedException('Only the client who posted the job can view applications');
    }

    return this.jobApplicationRepository.find({
      where: { job },
      relations: ['user', 'job', 'client'],
    });
  }

  async getUserApplications(userId: string): Promise<JobApplication[]> {
    return this.jobApplicationRepository.find({
      where: { user: { id: userId } },
      relations: ['job', 'client'],
    });
  }

  async acceptApplication(jobId: string, applicationId: string, userId: string): Promise<JobApplication> {
    const job = await this.jobService.findOne(jobId);
    if (job.client.id !== userId) {
      throw new UnauthorizedException('Only the client who posted the job can accept applications');
    }

    const application = await this.jobApplicationRepository.findOne({
      where: { id: applicationId },
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    application.status = 'accepted';
    return this.jobApplicationRepository.save(application);
  }

  async declineApplication(jobId: string, applicationId: string, userId: string): Promise<JobApplication> {
    const job = await this.jobService.findOne(jobId);
    if (job.client.id !== userId) {
      throw new UnauthorizedException('Only the client who posted the job can decline applications');
    }

    const application = await this.jobApplicationRepository.findOne({
      where: { id: applicationId },
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    application.status = 'rejected';
    return this.jobApplicationRepository.save(application);
  }
}
