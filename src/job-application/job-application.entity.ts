import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../user/user.entity';
import { Job } from '../jobs/jobs.entity';

@Entity()
export class JobApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Job, (job) => job.applications)
  job: Job;

  @ManyToOne(() => User, (user) => user.applications)
  user: User;

  @ManyToOne(() => User, (user) => user.clientApplications)
  client: User;

  @Column()
  proposal: string;

  @Column({ default: 'pending' })
  status: string; // e.g., pending, accepted, rejected
}
