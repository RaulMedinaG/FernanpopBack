import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      }
    });

    if (userFound) {
      return new HttpException('Este usuario ya existe', HttpStatus.CONFLICT)
    }

    const newUser = this.userRepository.create(createUserDto)
    return this.userRepository.save(newUser);

  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error al recuperar la lista de usuarios',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error al obtener el usuario por correo electrónico',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: id
      }
    });
    if (!userFound) {
      return new HttpException('Este usuario no existe', HttpStatus.NOT_FOUND)
    }
    const updateUser = Object.assign(userFound, updateUserDto);
    return this.userRepository.save(updateUser);
  }

  async delete(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: id
      }
    });
    if (!userFound) {
      return new HttpException('Este usuario no existe', HttpStatus.NOT_FOUND)
    }
    return this.userRepository.delete({id});
  }
}
