import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async createUser(@Body() clientDto: ClientDto) {
    return await this.clientService.create(clientDto);
  }

  @Get()
  async getClients() {
    return await this.clientService.findAll();
  }

  @Get(':id')
  async getClient(@Param('id') id: number) {
    if (id) {
      return await this.clientService.findOne(id);
    } else {
      throw new BadRequestException(' invalid id parameter');
    }
  }

  @Patch(':id')
  async updateClient(
    @Param('id') id: number,
    @Body() update: UpdateClientDto,
  ): Promise<Client> {
    return await this.clientService.updateClient(id, update);
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return await this.clientService.delete(id);
  }
}
