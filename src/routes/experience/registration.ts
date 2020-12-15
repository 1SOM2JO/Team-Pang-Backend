import express, { Request, response, Response } from 'express';
import userRepo from '../../database/repository/UserRepo';
import { ProtectedRequest } from 'app-request';
import validator from '../../middleware/validator';
import { SuccessMsgResponse } from '../../core/apiResponse';
import asyncHandler from '../../middleware/asyncHandler';
import authentication from '../../auth/authentication';
import schema from '../../schema/experience';
import ExperienceRepository from '../../database/repository/ExperienceRepo';

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.post(
    '/basic',
    validator(schema.registration),
    asyncHandler(async (req: Request, res: Response) => {
        ExperienceRepository.registration(
            req.body.experienceName,
            req.body.price,
            req.body.province,
            req.body.county,
            req.body.description,
            req.body.start_day,
            req.body.end_day,
            image
        );
    }),
);

export default router;