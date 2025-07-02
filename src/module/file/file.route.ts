import { Router } from 'express';
import { createFileController, getMyFilesController, toggleFavouriteController, deleteFileController, renameFileController, copyFileController, calendarFilterController, recentFilesController, lockFileController, unlockFileController, getFileController, fileSummaryController } from './file.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { fileCreateValidation, fileRenameValidation, lockFileValidation } from './file.validation';

const router = Router();

router.post('/', auth, validateRequest(fileCreateValidation), createFileController);
router.get('/', auth, getMyFilesController);
router.get('/calendar-filter', auth, calendarFilterController);
router.patch('/favourite/:id', auth, toggleFavouriteController);
router.delete('/:id', auth, deleteFileController);
router.patch('/rename/:id', auth, validateRequest(fileRenameValidation), renameFileController);
router.post('/copy/:id', auth, copyFileController);
router.get('/recent', auth, recentFilesController);
router.patch('/lock/:id', auth, validateRequest(lockFileValidation), lockFileController);
router.patch('/unlock/:id', auth, validateRequest(lockFileValidation), unlockFileController);
router.post('/view/:id', auth, getFileController);
router.get('/summary', auth, fileSummaryController);




export const FileRoutes = router;
