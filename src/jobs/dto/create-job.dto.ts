import { IsString, IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsNotEmpty()
  budget: number;

  @IsString()
  @IsNotEmpty()
  deadline: string;

  @IsString()
  @IsNotEmpty()
  postDate: string;

  @IsString()
  @IsNotEmpty()
  jobStatus: string;

  @IsString()
  @IsNotEmpty()
  startDate: string;
}
