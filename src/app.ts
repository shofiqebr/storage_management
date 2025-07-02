import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { UserRoutes } from './module/user/user.router';
import { FolderRoutes } from './module/folder/folder.route';

const app: Application = express();

// Allow multiple origins dynamically
const allowedOrigins = [
  "http://localhost:3000"
];

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      // Allow requests from allowed origins
      callback(null, true);
    } else {
      // Reject requests from other origins
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies with cross-origin requests
}));
app.use(express.urlencoded({ extended: true }));

app.use("/api/user",UserRoutes);
app.use("/api",FolderRoutes);



app.get('/', (req: Request, res: Response) => {
  res.send("Hello from storage management");
});

export default app;
