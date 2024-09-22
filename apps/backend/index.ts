import express, { type NextFunction, type Request, type Response } from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';

import { dbClient } from './services/mongoConnection';
import authRouter from "./controllers/auth";
import userRouter from "./controllers/users";
import taskRouter from "./controllers/tasks";
import authMiddleware from './middlewares/authMiddleware';

const PORT = 3000;
const app = express();

await dbClient.connect()
await dbClient.db("admin").command({ ping: 1 })


app.use(cookieParser())
app.use(express.json())

// let allowlist = ['http://example1.com', 'http://example2.com']
// let corsOptionsDelegate = (req: Request, callback) => {
//   var corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }
// app.use(cors(corsOptionsDelegate))

const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.29.69:5173",
  "http://0.0.0.0:5173",
  "http://localhost:3000",
  "http://192.168.29.69:3000",
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"]
}));
app.options('*', cors());


app.use("/auth", authRouter)
app.use("/users", authMiddleware, userRouter)
app.use("/tasks", authMiddleware, taskRouter)

app.disable('x-powered-by');

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  return res.json({
    message: "hello world"
  })
})


app.listen(PORT, '192.168.29.69', () => {
  console.log("db connected");
  console.log("listening at " + PORT)
})
