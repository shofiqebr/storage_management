"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.getSingleUserController = exports.getAllUsersController = exports.changePasswordController = exports.forgotPasswordController = exports.loginUserController = exports.registerUserController = void 0;
const UserService = __importStar(require("./user.service"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
// Register User
exports.registerUserController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserService.registerUser(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: 'User registered successfully',
        data: user,
    });
}));
// Login User
exports.loginUserController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { user, token } = yield UserService.loginUser(email, password);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Login successful',
        data: { user, token },
    });
}));
// Forgot Password
exports.forgotPasswordController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword } = req.body;
    yield UserService.forgotPassword(email, newPassword);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Password reset successful',
        data: null,
    });
}));
// Change Password
exports.changePasswordController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;
    yield UserService.changePassword(userId, oldPassword, newPassword);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Password changed successfully',
        data: null,
    });
}));
// Get All Users
exports.getAllUsersController = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserService.getAllUsers();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Users retrieved successfully',
        data: users,
    });
}));
// Get Single User
exports.getSingleUserController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserService.getSingleUser(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'User retrieved successfully',
        data: user,
    });
}));
// Update User
exports.updateUserController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserService.updateUser(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'User updated successfully',
        data: user,
    });
}));
// Delete User
exports.deleteUserController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield UserService.deleteUser(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'User deleted successfully',
        data: null,
    });
}));
