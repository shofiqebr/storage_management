import { Router } from 'express';
import { createFileController, getMyFilesController, toggleFavouriteController, deleteFileController } from './file.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { fileCreateValidation } from './file.validation';

const router = Router();

router.post('/', auth, validateRequest(fileCreateValidation), createFileController);
router.get('/', auth, getMyFilesController);
router.patch('/favourite/:id', auth, toggleFavouriteController);
router.delete('/:id', auth, deleteFileController);

export const FileRoutes = router;
