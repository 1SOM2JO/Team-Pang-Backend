import { getConnection, getRepository } from 'typeorm';
import experience from '../../schema/experience';
import { Experience } from '../model/Experience';
import { Experience_report } from '../model/Experience_report';
import { User } from '../model/User';

class ExperienceRepository {
    public static async findByUuid(uuid: number): Promise<Experience> {        
        return await getRepository(Experience)
            .createQueryBuilder('experience')
            .leftJoinAndSelect('experience.user', 'user')
            .where('experience.uuid = :uuid', { uuid })
            .getOne();
    }

    public static async likeUp(uuid: number): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .update(Experience)
            .set({ like: () => "experience.like + 1" })
            .where("uuid = :uuid", { uuid })
            .execute();
    }

    public static async likeDown(uuid: number): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .update(Experience)
            .set({ like: () => "experience.like - 1" })
            .where("uuid = :uuid", { uuid })
            .execute();
    }
    
    public static async registration(
        experienceName: string,
        price: string,
        province: string,
        county: string,
        description: string,
        startDay: string,
        endDay: string,
        image: string,
        user: User
    ): Promise<void> {
        const experience = new Experience();
        experience.experience_name = experienceName;
        experience.price = price;
        experience.province = province;
        experience.county = county;
        experience.description = description;
        experience.like = 0;
        experience.start_day = startDay;
        experience.end_day = endDay;
        experience.img = image;
        experience.user = user;
        await getRepository(Experience).save(experience);
    }

    public static async basicSearch(page: number): Promise<Experience[]> {
        const today = new Date().toISOString().substring(0, 10);

        return await getRepository(Experience)
            .createQueryBuilder('experience')
            .where('experience.start_day <= :today', { today })
            .andWhere('experience.end_day >= :today', { today })
            .orderBy('experience.createdAt', 'DESC')
            .limit(8)
            .offset(page * 8)
            .getMany()
    }
}

export default ExperienceRepository;