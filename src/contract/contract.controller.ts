import { Controller, Post, Body, Get, Param, Delete, Patch, Query } from '@nestjs/common';
import { ContractService } from './contract.service';
import { Contract } from './contract.entity';

@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  async createContract(@Body() contractData: Partial<Contract>, @Body('jobId') jobId: string): Promise<Contract> {
    return this.contractService.createContract(contractData, jobId);
  }

  @Patch(':id')
  async updateContract(@Param('id') id: string, @Body() updateData: Partial<Contract>): Promise<Contract> {
    return this.contractService.updateContract(id, updateData);
  }

  @Get()
  async findAll(): Promise<Contract[]> {
    return this.contractService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Contract> {
    return this.contractService.findOne(id);
  }

  @Get('search')
  async findByFreelancerAddress(@Query('freelancerAddress') freelancerAddress: string): Promise<Contract[]> {
    return this.contractService.findByFreelancerAddress(freelancerAddress);
  }

  @Delete(':id')
  async deleteContract(@Param('id') id: string): Promise<void> {
    return this.contractService.deleteContract(id);
  }
}
