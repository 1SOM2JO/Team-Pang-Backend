import express, { Request, response, Response } from 'express';
import { ProtectedRequest } from 'app-request';
import validator from '../../middleware/validator';
import { SuccessMsgResponse, SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../middleware/asyncHandler';
import authentication from '../../auth/authentication';
import schema from '../../schema/experience';
import ExperienceRepository from '../../database/repository/ExperienceRepo';
import { uploadMiddleware } from '../../middleware/fileUploader';
import _ from 'lodash';

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.get(
    '/basic/:experience_uuid',
    asyncHandler(async (req: ProtectedRequest, res: Response) => {
        const experienceUuid = req.params.experience_uuid;
        const experience = await ExperienceRepository.findByUuid(Number(experienceUuid));
        console.log(experience);
        
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
                "user.phonenumber"
            ])
        }).send(res);
    })
);

router.get(
    '/comment/:experience_uuid',
    asyncHandler(async (req: ProtectedRequest, res: Response) => {
        
    })
);

router.post(
    '/comment',
    asyncHandler(async (req: ProtectedRequest, res: Response) => {
        
    })
);

router.post(
    '/like',
    asyncHandler(async (req: ProtectedRequest, res: Response) => {
        
    })
);

router.delete(
    '/unlike',
    asyncHandler(async (req: ProtectedRequest, res: Response) => {
        
    })
);

export default router;