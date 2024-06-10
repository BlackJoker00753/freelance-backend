import { Controller, Post, Body, UseGuards, Request, Param, Get, Patch } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { JobService } from '../jobs/jobs.service';

@Controller('job-applications')
export class JobApplicationController {
  constructor(
    private readonly jobApplicationService: JobApplicationService,
    private readonly userService: UserService,
    private readonly jobService: JobService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':jobId')
  async applyForJob(
    @Param('jobId') jobId: string,
    @Body('proposal') proposal: string,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.jobApplicationService.applyForJob(userId, jobId, proposal);
  }

  @UseGuards(JwtAuthGuard)
  @Get('job/:jobId')
  async getApplicationsForJob(@Param('jobId') jobId: string, @Request() req) {
    const userId = req.user.userId;
    return this.jobApplicationService.getApplicationsForJob(jobId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserApplications(@Request() req) {
    const userId = req.user.userId;
    return this.jobApplicationService.getUserApplications(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':jobId/accept/:applicationId')
  async acceptApplication(
    @Param('jobId') jobId: string,
    @Param('applicationId') applicationId: string,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.jobApplicationService.acceptApplication(jobId, applicationId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':jobId/decline/:applicationId')
  async declineApplication(
    @Param('jobId') jobId: string,
    @Param('applicationId') applicationId: string,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.jobApplicationService.declineApplication(jobId, applicationId, userId);
  }
}
