import { Router } from 'express';
import { createFolderController, getMyFoldersController, deleteFolderController, copyFolderController } from './folder.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { folderCreateValidation } from './folder.validation';

const router = Router();

router.post('/folder', auth, validateRequest(folderCreateValidation), createFolderController);
router.post('/copy/:id', auth, copyFolderController);
router.get('/folder', auth, getMyFoldersController);
router.delete('/folder/:id', auth, deleteFolderController);

export const FolderRoutes = router;
