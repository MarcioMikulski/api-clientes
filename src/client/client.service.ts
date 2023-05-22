import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private repository: Repository<Client>,
  ) {}

  async create(client: ClientDto): Promise<Client> {
    return await this.repository.save(client);
  }

  async findAll(): Promise<Array<Client>> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.repository.findOne({ where: { id: id } });
    if (client) {
      return client;
    } else {
      throw new BadRequestException(' invalid id parameter');
    }
  }

  async updateClient(id: number, update: UpdateClientDto): Promise<Client> {
    const client = await this.repository.findOne({ where: { id: id } });
    if (!client) {
      throw new NotFoundException('client not found');
    } else {
      client.name = update.name;
      client.email = update.email;
      client.endereco = update.endereco;
      client.phone = update.phone;

      return await this.repository.save(client);
      console.log(client);
    }
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
