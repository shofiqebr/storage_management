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

export const renameFileController = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const fileId = req.params.id;
  const { name } = req.body;

  const file = await FileService.renameFile(fileId, userId, name);

  sendResponse<IFile>(res, {
    statusCode: 200,
    message: 'File renamed successfully',
    data: file,
  });
});

export const copyFileController = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const fileId = req.params.id;

  const copiedFile = await FileService.copyFile(fileId, userId);

  sendResponse<IFile>(res, {
    statusCode: 201,
    message: 'File copied successfully',
    data: copiedFile,
  });
});


export const calendarFilterController = catchAsync(async (req, res) => {
  const userId = (req as any).user.id;
  const { date } = req.query;

  if (!date || typeof date !== 'string') {
    throw new Error('Date query parameter is required (YYYY-MM-DD)');
  }

  const files = await FileService.filterFilesByDate(userId, date);

  sendResponse(res, {
    statusCode: 200,
    message: `Files for ${date} retrieved successfully`,
    data: files,
  });
});

export const recentFilesController = catchAsync(async (req, res) => {
  const userId = (req as any).user.id;
  const limit = parseInt(req.query.limit as string) || 10;

  const files = await FileService.getRecentFiles(userId, limit);

  sendResponse(res, {
    statusCode: 200,
    message: 'Recent files retrieved successfully',
    data: files,
  });
});

export const lockFileController = catchAsync(async (req, res) => {
  const userId = (req as any).user.id;
  const fileId = req.params.id;
  const { password } = req.body;

  const file = await FileService.lockFile(fileId, userId, password);
  sendResponse(res, { statusCode: 200, message: 'File locked', data: file });
});

export const unlockFileController = catchAsync(async (req, res) => {
  const userId = (req as any).user.id;
  const fileId = req.params.id;
  const { password } = req.body;

  const file = await FileService.unlockFile(fileId, userId, password);
  sendResponse(res, { statusCode: 200, message: 'File unlocked', data: file });
});

export const getFileController = catchAsync(async (req, res) => {
  const userId = (req as any).user.id;
  const fileId = req.params.id;
  const { password } = req.body;

  const file = await FileService.getFileById(fileId, userId, password);
  sendResponse(res, { statusCode: 200, message: 'File retrieved', data: file });
});

export const fileSummaryController = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  const summary = await FileService.getUserFileSummary(userId);

  sendResponse(res, {
    statusCode: 200,
    message: 'File summary retrieved successfully',
    data: summary,
  });
});
