import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './jobs.entity';
import { JobController } from './jobs.controller';
import { JobService } from './jobs.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), UserModule],
  providers: [JobService],
  controllers: [JobController],
  exports: [JobService],
})
export class JobsModule {}
