import { getConnection, getRepository } from 'typeorm';
import experience from '../../schema/experience';
import { Experience } from '../model/Experience';
import { Experience_report } from '../model/Experience_report';
import { User } from '../model/User';

class ExperienceReportRepository {
    public static async create(user: User, experience: Experience, description: string): Promise<void> {
        const experienceReport = new Experience_report();
        experienceReport.user = user;
        experienceReport.experience = experience;
        experienceReport.description = description;
        await getRepository(Experience_report).save(experienceReport);
    }

    public static async findByUuidAndExperienceUuid(userUuid:number, experienceUuid: number): Promise<Experience_report> {
        return await getRepository(Experience_report)
            .createQueryBuilder('experience_report')
            .where('experience_report.userUuid = :userUuid', { userUuid })
            .andWhere('experience_report.experienceUuid = :experienceUuid', {experienceUuid})
            .getOne();
    }
}

export default ExperienceReportRepository;