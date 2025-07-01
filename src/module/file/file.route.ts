import { Router } from 'express';
import { createFileController, getMyFilesController, toggleFavouriteController, deleteFileController, renameFileController, copyFileController } from './file.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { fileCreateValidation, fileRenameValidation } from './file.validation';

const router = Router();

router.post('/', auth, validateRequest(fileCreateValidation), createFileController);
router.get('/', auth, getMyFilesController);
router.patch('/favourite/:id', auth, toggleFavouriteController);
router.delete('/:id', auth, deleteFileController);
router.patch('/rename/:id', auth, validateRequest(fileRenameValidation), renameFileController);
router.post('/copy/:id', auth, copyFileController);

export const FileRoutes = router;
