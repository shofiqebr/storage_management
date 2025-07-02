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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const UserController = __importStar(require("./user.controller"));
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post('/register', (0, validateRequest_1.default)(user_validation_1.userRegisterValidation), UserController.registerUserController);
router.post('/login', (0, validateRequest_1.default)(user_validation_1.userLoginValidation), UserController.loginUserController);
router.post('/forgot-password', (0, validateRequest_1.default)(user_validation_1.userForgotPassValidation), UserController.forgotPasswordController);
router.patch('/change-password', auth_1.default, (0, validateRequest_1.default)(user_validation_1.userChangePassValidation), UserController.changePasswordController);
router.get('/all', auth_1.default, UserController.getAllUsersController);
router.get('/:id', auth_1.default, UserController.getSingleUserController);
router.patch('/:id', auth_1.default, (0, validateRequest_1.default)(user_validation_1.userUpdateValidation), UserController.updateUserController);
router.delete('/:id', auth_1.default, UserController.deleteUserController);
exports.UserRoutes = router;
