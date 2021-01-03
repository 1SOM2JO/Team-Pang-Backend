import { getConnection, getRepository } from 'typeorm';
import { Experience } from '../model/Experience';
import { Experience_like } from '../model/Experience_like';
import { User } from '../model/User';

class ExperienceLikeRepository {
    public static async findByUuidAndExperienceUuid(userUuid: number, experienceUuid): Promise<Experience_like> {
        return await getRepository(Experience_like)
            .createQueryBuilder('experience_like')
            .where('experience_like.userUuid = :userUuid', { userUuid })
            .andWhere('experience_like.experienceUuid = :experienceUuid', {experienceUuid})
            .getOne();
    }

    public static async create(user: User, experience: Experience) {
        const experienceLike = new Experience_like();
        experienceLike.user = user;
        experienceLike.experience = experience;
        await getRepository(Experience_like).save(experienceLike);
    }

    public static async delete(userUuid: number, experienceUuid: number): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Experience_like)
            .where("userUuid = :userUuid", { userUuid })
            .andWhere("ExperienceUuid = :experienceUuid", { experienceUuid })
            .execute();
    }
}

export default ExperienceLikeRepository;