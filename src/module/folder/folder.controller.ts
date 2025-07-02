/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FolderService } from './folder.service';
import { IFolder } from './folder.interface';

export const createFolderController = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const folder = await FolderService.createFolder({ ...req.body, user: userId });
  
  sendResponse<IFolder>(res, {
    statusCode: 201,
    message: 'Folder created successfully',
    data: folder,
  });
});

export const getMyFoldersController = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const folders = await FolderService.getUserFolders(userId);

  sendResponse<IFolder[]>(res, {
    statusCode: 200,
    message: 'Folders retrieved successfully',
    data: folders,
  });
});

export const deleteFolderController = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const folderId = req.params.id;
  await FolderService.deleteFolder(folderId, userId);

  sendResponse<null>(res, {
    statusCode: 200,
    message: 'Folder deleted successfully',
    data: null,
  });
});

export const copyFolderController = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const folderId = req.params.id;

  const copiedFolder = await FolderService.copyFolder(folderId, userId);

  sendResponse<IFolder>(res, {
    statusCode: 201,
    message: 'Folder copied successfully',
    data: copiedFolder,
  });
});

