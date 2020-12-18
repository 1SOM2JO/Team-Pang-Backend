import express, { Request, response, Response } from 'express';
import userRepo from '../../database/repository/UserRepo';
import { ProtectedRequest } from 'app-request';
import validator from '../../middleware/validator';
import { SuccessMsgResponse, SuccessResponse } from '../../core/apiResponse';
import asyncHandler from '../../middleware/asyncHandler';
import authentication from '../../auth/authentication';
import schema from '../../schema/experience';
import ExperienceRepository from '../../database/repository/ExperienceRepo';
import { uploadMiddleware } from '../../middleware/fileUploader';
import multipart from 'connect-multiparty';
import {S3} from '../../config';

const multipartMiddleware = multipart();
const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.post(
    '/basic',
    validator(schema.registration),
    uploadMiddleware.single('image'),
    asyncHandler(async (req: ProtectedRequest, res: Response) => {      
        ExperienceRepository.registration(
            req.body.experienceName,
            req.body.price,
            req.body.province,
            req.body.county,
            req.body.description,
            req.body.start_day,
            req.body.end_day,
            req.file['key'],
            req.user
        );

        new SuccessMsgResponse('Success registration')
            .send(res);
    }),
);

export default router;