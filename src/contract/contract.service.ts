import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { Job } from '../jobs/jobs.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) {}

  async createContract(
    contractData: Partial<Contract>,
    jobId: string,
  ): Promise<Contract> {
    const job = await this.contractRepository.manager.findOne(Job, {
      where: { id: jobId },
    });
    if (!job) {
      throw new NotFoundException(`Job with ID "${jobId}" not found`);
    }

    const contract = this.contractRepository.create({
      ...contractData,
      job,
    });

    return this.contractRepository.save(contract);
  }

  async updateContract(
    id: string,
    updateData: Partial<Contract>,
  ): Promise<Contract> {
    const contract = await this.contractRepository.findOne({ where: { id } });
    if (!contract) {
      throw new NotFoundException(`Contract with ID "${id}" not found`);
    }

    Object.assign(contract, updateData);
    return this.contractRepository.save(contract);
  }

  async findAll(): Promise<Contract[]> {
    return this.contractRepository.find({ relations: ['job'] });
  }

  async findOne(id: string): Promise<Contract> {
    const contract = await this.contractRepository.findOne({
      where: { id },
      relations: ['job'],
    });
    if (!contract) {
      throw new NotFoundException(`Contract with ID "${id}" not found`);
    }
    return contract;
  }

  async findByFreelancerAddress(
    freelancerAddress: string,
  ): Promise<Contract[]> {
    return this.contractRepository.find({
      where: { freelancerAddress },
      relations: ['job'],
    });
  }

  async deleteContract(id: string): Promise<void> {
    const result = await this.contractRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Contract with ID "${id}" not found`);
    }
  }
}
