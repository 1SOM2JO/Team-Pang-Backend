import { EntityRepository, Repository } from 'typeorm';
import { User } from '../model/User';
import { promises } from 'dns';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async findByUuid(uuid: string): Promise<User> {
    return await this.createQueryBuilder('user')
      .where('user.uuid = :uuid', { uuid })
      .getOne();
  }

  public async findById(id: string): Promise<User> {
    return await this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  public async findByPhonenumber(phone: string): Promise<User> {
    return await this.createQueryBuilder('user')
      .where('user.phonenumber = :phonenumber', { phone })
      .getOne();
  }

  public async createUser(
    id: string,
    permission: string,
    nickname: string,
    password: string,
    phonenumber: string,
  ): Promise<User> {
    const user = new User();
    user.id = id;
    user.permission = permission;
    user.nickname = nickname;
    user.password = password;
    user.phonenumber = phonenumber;
    return await this.manager.save(user);
  }
}
