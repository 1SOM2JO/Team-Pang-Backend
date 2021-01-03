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

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.get(
    '/basic/:page',
    asyncHandler(async (req: ProtectedRequest, res: Response) => {      
        const experienceList = await ExperienceRepo.basicSearch(req.params.page);
    
        new SuccessResponse('Success Experience List', {
            experienceList: experienceList.map((data) => {
                return _.pick(data, [
                    "uuid",
                    "experience_name",
                    "price",
                    "province",
                    "county",
                    "start_day",
                    "end_day",
                    "img"
                ]);
            })
        }).send(res);
    }),
)

export default router;