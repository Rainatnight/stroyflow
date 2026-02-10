import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './schemas/users.schema';
import { v4 as uuidv4 } from 'uuid'; // для генерации уникального ID

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Создание нового пользователя
  async createUser(login: string, password: string): Promise<User> {
    const user = this.userRepository.create({
      _id: uuidv4(), // генерируем уникальный ID
      login,
      password,
    });

    return this.userRepository.save(user);
  }

  // Пример тестового метода
  async test(userId: string) {
    console.log('here', userId);

    const newUser = await this.createUser(`login_${userId}`, `pass_${userId}`);
    console.log('Created user:', newUser);
    return newUser;
  }
}
