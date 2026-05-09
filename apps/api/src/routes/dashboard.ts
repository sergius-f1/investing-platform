import { Router } from 'express';
import { getDashboard, streamDashboard } from '../controllers/dashboard';

const router = Router();

router.get('/', getDashboard);
router.get('/stream', streamDashboard);

export default router;
