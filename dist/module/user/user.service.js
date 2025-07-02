"use strict";
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
exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getAllUsers = exports.changePassword = exports.forgotPassword = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield user_model_1.UserModel.findOne({ email: payload.email });
    if (existing)
        throw new Error('Email already registered');
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 10);
    const user = yield user_model_1.UserModel.create({
        fullName: payload.fullName,
        email: payload.email,
        password: hashedPassword,
        storageUsed: 0,
        maxStorage: 15 * 1024 * 1024 * 1024,
    });
    return user;
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ email });
    if (!user)
        throw new Error('User not found');
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error('Invalid credentials');
    const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    return { user, token };
});
exports.loginUser = loginUser;
const forgotPassword = (email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ email });
    if (!user)
        throw new Error('User not found');
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
    yield user_model_1.UserModel.findByIdAndUpdate(user._id, { password: hashedPassword });
});
exports.forgotPassword = forgotPassword;
const changePassword = (userId, oldPass, newPass) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findById(userId);
    if (!user)
        throw new Error('User not found');
    const isMatch = yield bcrypt_1.default.compare(oldPass, user.password);
    if (!isMatch)
        throw new Error('Old password incorrect');
    const hashedPassword = yield bcrypt_1.default.hash(newPass, 10);
    yield user_model_1.UserModel.findByIdAndUpdate(userId, { password: hashedPassword });
});
exports.changePassword = changePassword;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.UserModel.find();
});
exports.getAllUsers = getAllUsers;
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findById(id);
    if (!user)
        throw new Error('User not found');
    return user;
});
exports.getSingleUser = getSingleUser;
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findByIdAndUpdate(id, payload, { new: true });
    if (!user)
        throw new Error('User not found');
    return user;
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.UserModel.findByIdAndDelete(id);
});
exports.deleteUser = deleteUser;
