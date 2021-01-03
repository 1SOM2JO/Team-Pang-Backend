import { getConnection, getRepository } from 'typeorm';
import { Experience } from '../model/Experience';
import { Experience_comment } from '../model/Experience_comment';
import { User } from '../model/User';

class ExperienceCommentRepository {
    public static async findAllByUuid(experienceUuid: number): Promise<Experience_comment[]> {
        return await getRepository(Experience_comment)
            .createQueryBuilder('experience_comment')
            .where('experience_comment.experienceUuid = :experienceUuid', { experienceUuid })
            .getMany();
    }

    public static async findByUuidAndExperienceUuid(userUuid, experienceUuid): Promise<Experience_comment> {
        return await getRepository(Experience_comment)
            .createQueryBuilder('experience_comment')
            .where('experience_comment.userUuid = :userUuid', { userUuid })
            .andWhere('experience_comment.experienceUuid = :experienceUuid', { experienceUuid })
            .getOne();
    }

    public static async registration(
        user: User,
        post: Experience,
        nickname: string,
        star: number,
        comment: string,
    ): Promise<void> {
        const experience_comment = new Experience_comment();
        experience_comment.experience = post;
        experience_comment.user = user;
        experience_comment.nickname = nickname;
        experience_comment.star = star;
        experience_comment.comment = comment;
        await getRepository(Experience_comment).save(experience_comment)
    }

    public static async getLikeAverage(experienceUuid: number) {
        const { star } = await getRepository(Experience_comment)
            .createQueryBuilder("experience_comment")
            .select("AVG(experience_comment.star)", "star")
            .where("experience_comment.experienceUuid = :experienceUuid", { experienceUuid })
            .getRawOne();
        
        return star;    
    }
}

export default ExperienceCommentRepository;