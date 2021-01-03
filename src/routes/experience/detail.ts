import express, { Request, response, Response } from 'express';
import { ProtectedRequest } from 'app-request';
import validator from '../../middleware/validator';
import { SuccessMsgResponse, SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../middleware/asyncHandler';
import authentication from '../../auth/authentication';
import schema from '../../schema/experience';
import ExperienceRepo from '../../database/repository/ExperienceRepo';
import ExperienceCommentRepo from '../../database/repository/ExperienceCommentRepo'
import { uploadMiddleware } from '../../middleware/fileUploader';
import _ from 'lodash';
import { Experience } from '../../database/model/Experience';
import { BadRequestError } from '../../core/apiError';
import { Experience_comment } from '../../database/model/Experience_comment';
import ExperienceLikeRepo from '../../database/repository/ExperienceLikeRepo';
import ExperienceReportRepo from '../../database/repository/ExperienceReportRepo';
import { Experience_report } from '../../database/model/Experience_report';
import { number } from '@hapi/joi';

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.get(
    '/basic/:experience_uuid',
    asyncHandler(async (req: ProtectedRequest, res: Response) => {
        const experienceUuid = req.params.experience_uuid;
        const experience = await ExperienceRepo.findByUuid(Number(experienceUuid));
        const experienceLike = await ExperienceLikeRepo.findByUuidAndExperienceUuid(req.user.uuid, experience.uuid);

        new SuccessResponse('Success Experience Detail', {
            experience: _.pick(experience, [
                "uuid",
                "experience_name",
                "price",
                "province",
                "county",
                "start_day",
                "end_day",
                "like",
                "description",
                "img",
                "user.uuid",
                "user.user_img",
                "user.phonenumber",
            ]),
            like: Boolean(experienceLike)
        }).send(res);
    })
);

router.get(
    '/star/:post_uuid',
    asyncHandler(async (req: ProtectedRequest, res: Response) => {
        const likeAverage = await ExperienceCommentRepo.getLikeAverage(req.params.post_uuid);
        
        new SuccessResponse('Success Like Everage', {
            likeEverage: Number(likeAverage),
        }).send(res);
    })
)

router.get(
    '/comment/:experience_uuid',
    
    asyncHandler(async (req: ProtectedRequest, res: Response) => {
        const experienceUuid = req.params.experience_uuid;
        const experienceComment = await ExperienceCommentRepo.findAllByUuid(Number(experienceUuid));

        new SuccessResponse('Success Comment Log', {
            experienceComment: experienceComment.map((data) => {
                return _.pick(data, [
                    "nickname",
                    "star",
                    "comment"
                ]);
            })
        }).send(res);
    })
);

router.post(
    '/comment',
    validator(schema.commentRegistration),
    asyncHandler(async (req: ProtectedRequest, res: Response) => {
        const experience: Experience = await ExperienceRepo.findByUuid(req.body.post_uuid);
        
        const commentIsExist: Experience_comment = await ExperienceCommentRepo.findByUuidAndExperienceUuid(req.user.uuid, experience.uuid);
        if(Boolean(commentIsExist)) throw new BadRequestError('comment already posted');

        await ExperienceCommentRepo.registration(
            req.user,
            experience,
            req.user.nickname,
            req.body.star,
            req.body.comment
        );

        new SuccessMsgResponse('Success registration').send(res);
    })
);

router.post(
    '/like',
    asyncHandler(async (req: ProtectedRequest, res: Response) => {
        const experience: Experience = await ExperienceRepo.findByUuid(req.body.post_uuid);
        if(await ExperienceLikeRepo.findByUuidAndExperienceUuid(req.user.uuid, experience.uuid))
            throw new BadRequestError('already liked');

        ExperienceLikeRepo.create(req.user, experience);
        ExperienceRepo.likeUp(experience.uuid);   

        new SuccessMsgResponse('Like Success').send(res);
    })
);

router.delete(
    '/unlike',
    asyncHandler(async (req: ProtectedRequest, res: Response) => {
        const experience: Experience = await ExperienceRepo.findByUuid(req.body.post_uuid);
        if(!(await ExperienceLikeRepo.findByUuidAndExperienceUuid(req.user.uuid, experience.uuid)))
            throw new BadRequestError('do not like');

        ExperienceLikeRepo.delete(req.user.uuid, experience.uuid);
        ExperienceRepo.likeDown(experience.uuid);   

        new SuccessMsgResponse('Unlike Success').send(res);
    })
);

router.post(
    '/report',
    asyncHandler(async (req: ProtectedRequest, res: Response) => {
        const experience: Experience = await ExperienceRepo.findByUuid(req.body.post_uuid);
        
        const reportIsExist: Experience_report = await ExperienceReportRepo.findByUuidAndExperienceUuid(req.user.uuid, experience.uuid);
        if(Boolean(reportIsExist)) throw new BadRequestError('report already posted');

        await ExperienceReportRepo.create(
            req.user,
            experience,
            req.body.description
        );

        new SuccessMsgResponse('Report Success').send(res);
    })
);

export default router;