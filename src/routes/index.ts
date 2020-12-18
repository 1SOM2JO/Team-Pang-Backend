import express from 'express';
import signup from './user/signup';
import signin from './user/signin';
import logout from './user/logout';
import token from './user/token';
import registration from './experience/registration';
import detail from './experience/detail'
import apikey from '../auth/apikey';

const router = express.Router();

router.use('/', apikey);

router.use('/user/logout', logout);
router.use('/user/signup', signup);
router.use('/user/signin', signin);
router.use('/user/token', token);

router.use('/experience/registration', registration);
router.use('/experience/detail', detail);

export default router;