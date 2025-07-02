"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_router_1 = require("./module/user/user.router");
const folder_route_1 = require("./module/folder/folder.route");
const file_route_1 = require("./module/file/file.route");
const app = (0, express_1.default)();
// Allow multiple origins dynamically
const allowedOrigins = [
    "http://localhost:3000"
];
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            // Allow requests from allowed origins
            callback(null, true);
        }
        else {
            // Reject requests from other origins
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Allow cookies with cross-origin requests
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/user", user_router_1.UserRoutes);
app.use("/api/folder", folder_route_1.FolderRoutes);
app.use("/api/file", file_route_1.FileRoutes);
app.get('/', (req, res) => {
    res.send("Hello from storage management");
});
exports.default = app;
