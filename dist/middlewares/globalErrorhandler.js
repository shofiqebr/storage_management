"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    console.log(err);
    //setting default values
    let message = err.message || "Internal Server Error";
    const statusCode = err.statusCode || 500;
    //ultimate return
    res.status(statusCode).json({
        success: false,
        message,
        error: (err === null || err === void 0 ? void 0 : err.errors) || err,
        // stack: config.NODE_ENV === "development" ? err?.stack : null,
    });
};
exports.default = globalErrorHandler;
