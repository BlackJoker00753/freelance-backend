import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Job } from '../jobs/jobs.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contractAddress: string;

  @Column()
  clientAddress: string;

  @Column()
  freelancerAddress: string;

  @ManyToOne(() => Job, (job) => job.contracts)
  job: Job;
}
