import express from 'express';
import apikey from '../auth/apikey';

const router = express.Router();

router.use('/', apikey);


export default router;
