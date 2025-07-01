/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FileService } from './file.service';
import { IFile } from './file.interface';

export const createFileController = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const file = await FileService.createFile({ ...req.body, user: userId });

  sendResponse<IFile>(res, {
    statusCode: 201,
    message: 'File created successfully',
    data: file,
  });
});

export const getMyFilesController = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const files = await FileService.getUserFiles(userId);

  sendResponse<IFile[]>(res, {
    statusCode: 200,
    message: 'Files retrieved successfully',
    data: files,
  });
});

export const toggleFavouriteController = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const fileId = req.params.id;
  const file = await FileService.toggleFavourite(fileId, userId);

  sendResponse<IFile>(res, {
    statusCode: 200,
    message: 'Favourite status updated',
    data: file,
  });
});

export const deleteFileController = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const fileId = req.params.id;
  await FileService.deleteFile(fileId, userId);

  sendResponse<null>(res, {
    statusCode: 200,
    message: 'File deleted successfully',
    data: null,
  });
});
