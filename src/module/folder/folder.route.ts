import { Router } from 'express';
import { createFolderController, getMyFoldersController, deleteFolderController, copyFolderController } from './folder.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { folderCreateValidation } from './folder.validation';

const router = Router();

router.post('/', auth, validateRequest(folderCreateValidation), createFolderController);
router.post('/copy/:id', auth, copyFolderController);
router.get('/', auth, getMyFoldersController);
router.delete('/:id', auth, deleteFolderController);

export const FolderRoutes = router;
