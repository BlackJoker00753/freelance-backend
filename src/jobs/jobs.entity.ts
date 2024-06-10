import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { JobApplication } from '../job-application/job-application.entity';
import { Contract } from '../contract/contract.entity';
import { Chat } from '../chat/chat.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('int')
  budget: number;

  @Column()
  deadline: string;

  @Column()
  postDate: string;

  @Column()
  jobStatus: string;

  @Column()
  startDate: string;

  @ManyToOne(() => User, (user) => user.jobs)
  client: User;

  @OneToMany(() => JobApplication, (application) => application.job)
  applications: JobApplication[];

  @OneToMany(() => Chat, (chat) => chat.job)
  chats: Chat[];

  @OneToMany(() => Contract, (contract) => contract.job)
  contracts: Contract[];
}
