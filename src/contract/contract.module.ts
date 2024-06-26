import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './contract.entity';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { JobsModule } from '../jobs/jobs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contract]), JobsModule],
  providers: [ContractService],
  controllers: [ContractController],
})
export class ContractModule {}
