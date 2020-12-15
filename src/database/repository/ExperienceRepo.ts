import { getConnection, getRepository } from 'typeorm';
import { Request } from 'express';
import { Experience } from '../model/Experience';

class ExperienceRepository {
    public static async registration(
        experienceName: string,
        price: string,
        province: string,
        county: string,
        description: string,
        startDay: string,
        endDay: string,
        image: string,
    ) {
        const experience = new Experience();
        experience.experience_name = experienceName;
        experience.price = price;
        experience.province = province;
        experience.county = county;
        experience.description = description;
        experience.start_day = startDay;
        experience.end_day = endDay;
        experience.img = image;
        await getRepository(Experience).save(experience);
    }
}

export default ExperienceRepository;