import { getConnection, getRepository } from 'typeorm';
import { Request } from 'express';
import { Experience } from '../model/Experience';
import { expression } from '@hapi/joi';
import { User } from '../model/User';

class ExperienceRepository {
    public static async findByUuid(uuid: number) {        
        return await getRepository(Experience)
            .createQueryBuilder('experience')
            .leftJoinAndSelect('experience.user', 'user')
            .where('experience.uuid = :uuid', { uuid })
            .getOne();
    }

    // const today = new Date().toISOString().substring(0, 10);
    // .where('experience.start_day <= :today', { today })
    // .andWhere('experience.end_day >= :today', { today })

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
    ) {
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
}

export default ExperienceRepository;