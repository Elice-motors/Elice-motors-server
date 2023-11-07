import express from "express";
import mainRouter from "./routers/routers.js";
import cors from "cors";
import {config} from "dotenv";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config(); // dotenv 설정 호출

const MONGO_NAME = process.env.MONGO_NAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

import mongoose from "mongoose";

const port = 3000;
const app = express();

mongoose
  .connect(`mongodb+srv://${MONGO_NAME}:${MONGO_PASSWORD}@project-db.duhldeb.mongodb.net/elice-motors?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// 상품 관련 CRUD 라우터를 사용
app.use(
  cors({
    origin: "*", // 모든 도메인에서 요청 허용
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // 허용할 HTTP 메서드
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// api router
app.use("/api", mainRouter);

// static file serving
app.use("/images", express.static("public/assets/cars/"));

// react build file serving as static
app.use("/", express.static(join(__dirname, "build")));

// render react app
// "/" 가 아닌 "*"을 써야 react-router에 설정된 모든 URL에 대해 index.html을 서빙한다.
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`서버가 정상적으로 시작되었습니다. 주소: http://localhost:${port}`);
});
