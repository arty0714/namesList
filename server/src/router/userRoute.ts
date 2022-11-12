import express from 'express';

import * as userController from '../controllers/userController';
import { validateUser } from '../controllers/middleware/validateUser';

const router = express.Router();

router.use(validateUser);

router.route('/names')
	.get(userController.getNames)
	.post(userController.addName)

router.route('/names/:id')
	.delete(userController.deleteName)
	.put(userController.updateName)

router.post('/changeNameOrder', userController.changeNameOrder)

export default router;