import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicationService } from './job-application.service';
import { JobApplicationController } from './job-application.controller';
import { JobApplication } from './job-application.entity';
import { UserModule } from '../user/user.module';
import { JobsModule } from '../jobs/jobs.module';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication]), UserModule, JobsModule],
  providers: [JobApplicationService],
  controllers: [JobApplicationController],
})
export class JobApplicationModule {}
