import { Router } from 'express';
import { createFolderController, getMyFoldersController, deleteFolderController } from './folder.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { folderCreateValidation } from './folder.validation';

const router = Router();

router.post('/folder', auth, validateRequest(folderCreateValidation), createFolderController);
router.get('/folder', auth, getMyFoldersController);
router.delete('/folder/:id', auth, deleteFolderController);

export const FolderRoutes = router;
