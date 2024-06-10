import { Controller, Post, Body, Get, Param, Delete, Patch, UseGuards, Request } from '@nestjs/common';
import { ContractService } from './contract.service';
import { Contract } from './contract.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('my-contracts')
  async findMyContracts(@Request() req): Promise<Contract[]> {
    const { walletAddress } = req.user;
    return this.contractService.findByFreelancerAddress(walletAddress);
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
