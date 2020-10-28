import express from 'express';
import apikey from '../auth/apikey';
import signup from './user/signup';
import signin from './user/signin';
import logout from './user/logout';
import token from './user/token';

const router = express.Router();

router.use('/', apikey);

router.use('/user/logout', logout);
router.use('/user/signup', signup);
router.use('/user/signin', signin);
router.use('/user/token', token);

export default router;
