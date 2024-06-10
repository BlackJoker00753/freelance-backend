import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateJobDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  budget?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  deadline?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  postDate?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  jobStatus?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  startDate?: string;
}
