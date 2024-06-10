import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Job } from '../jobs/jobs.entity';
import { JobApplication } from '../job-application/job-application.entity';
import { Chat } from '../chat/chat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  profilePictureURL: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ nullable: true })
  walletAddress: string;

  @Column()
  role: number;

  @OneToMany(() => Job, (job) => job.client)
  jobs: Job[];

  @OneToMany(() => JobApplication, (application) => application.user)
  applications: JobApplication[];

  @OneToMany(() => JobApplication, (application) => application.client)
  clientApplications: JobApplication[];

  @OneToMany(() => Chat, (chat) => chat.sender)
  sentMessages: Chat[];

  @OneToMany(() => Chat, (chat) => chat.receiver)
  receivedMessages: Chat[];

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}
