import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ContractService } from './contract.service';
import { Contract } from './contract.entity';

@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  async createContract(
    @Body() contractData: Partial<Contract>,
    @Body('jobId') jobId: string,
  ): Promise<Contract> {
    return this.contractService.createContract(contractData, jobId);
  }

  @Get()
  async findAll(): Promise<Contract[]> {
    return this.contractService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Contract> {
    return this.contractService.findOne(id);
  }

  @Delete(':id')
  async deleteContract(@Param('id') id: string): Promise<void> {
    return this.contractService.deleteContract(id);
  }
}
