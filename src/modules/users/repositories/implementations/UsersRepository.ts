import { AppDataSource } from '../../../../database/data-source'
import { User } from '../../entities/User'
import { ICreateUserDTO, IUsersRepository } from '../IUsersRepository'
import { hash } from 'bcryptjs'

class UsersRepository implements IUsersRepository {
  async createUser({ name, email, company, password }: ICreateUserDTO): Promise<User> {
    const userRepository = AppDataSource.getRepository(User)

    const passwordHash = await hash(password, 8)

    const user = userRepository.create({
      name,
      email,
      company,
      password: passwordHash,
    })
    await userRepository.save(user)
    return user
  }
  async findUserByEmail(email: string): Promise<User> {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
      where: {
        email,
      },
    })
    return user
  }

  async findUserById(id: string): Promise<User> {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
      where: {
        id,
      },
    })
    return user
  }

  async listUsers(): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User)
    const users = await userRepository.find()
    return users
  }

  async removeUser(id: string): Promise<User> {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
      where: {
        id,
      },
    })
    return await userRepository.remove(user)
  }

  updateUser({ id, name, email, company, password }: ICreateUserDTO): Promise<any> {
    const userRepository = AppDataSource.getRepository(User)

    const user = userRepository.update({ id }, { name, email, company, password })
    return user
  }
}

export { UsersRepository }
