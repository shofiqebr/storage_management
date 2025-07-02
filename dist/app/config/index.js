"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: parseInt(process.env.BCRYPT_SALT_ROUND, 10),
    jwt: {
        access_secret: process.env.JWT_ACCESS_SECRET,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || "7d",
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    sp: {
        sp_endpoint: process.env.SP_ENDPOINT,
        sp_username: process.env.SP_USERNAME,
        sp_password: process.env.SP_PASSWORD,
        sp_prefix: process.env.SP_PREFIX,
        sp_return_url: process.env.SP_RETURN_URL,
    },
};
