import express from 'express';
import userRepo from '../../database/repository/UserRepo';
import { ProtectedRequest } from 'app-request';
import { SuccessMsgResponse } from '../../core/apiResponse';
import asyncHandler from '../../middleware/asyncHandler';
import authentication from '../../auth/authentication';

const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Access Token
router.use('/', authentication);
/*-------------------------------------------------------------------------*/

router.delete(
  '/',
  asyncHandler(async (req: ProtectedRequest, res) => {
    await userRepo.UserKeyUpdate(req.user.uuid, null, null);
    new SuccessMsgResponse('Logout success').send(res);
  }),
);

export default router;
