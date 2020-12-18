import { getConnection, getRepository } from 'typeorm';
import { User } from '../model/User';

class UserRepository {
  public static async findByUuid(uuid: number): Promise<User> {
    return await getRepository(User)
      .createQueryBuilder('user')
      .where('user.uuid = :uuid', { uuid })
      .getOne();
  }

  public static async findById(id: string): Promise<User> {
    return await getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  public static async findByPhonenumber(phonenumber: string): Promise<User> {
    return await getRepository(User)
      .createQueryBuilder('user')
      .where('user.phonenumber = :phonenumber', { phonenumber })
      .getOne();
  }

  public static async createUser(
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
    return await getRepository(User).save(user);
  }

  public static async UserKeyUpdate(
    uuid: number,
    firstKey: string,
    secondKey: string,
  ): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        accessTokenKey: firstKey,
        refreshTokenKey: secondKey,
      })
      .where('uuid = :uuid', { uuid })
      .execute();
  }

  public static async test(
    uuid: number
  ) {
    await getConnection()
      .createQueryBuilder()
      
  }
}

export default UserRepository;
