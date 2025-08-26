import { Router } from 'express';

import { getSigns } from '../controllers/signs.controller';

const router = Router();

router.get('', getSigns);

export default router;
