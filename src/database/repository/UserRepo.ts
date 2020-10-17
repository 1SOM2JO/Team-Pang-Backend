import { EntityRepository, Repository } from 'typeorm';
import { User } from '../model/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async findByUuid(uuid: string): Promise<User> {
    return await this.createQueryBuilder('user')
      .where('user.uuid = :uuid', { uuid })
      .getOne();
  }
}
