import express from 'express';
import carRouter from './routers/carRouter.js';
import cors from 'cors';
import { config } from 'dotenv';

config(); // dotenv 설정 호출

const MONGO_NAME = process.env.MONGO_NAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

import mongoose from 'mongoose';

const port = 3000;
const app = express();

mongoose
  .connect(
    `mongodb+srv://${MONGO_NAME}:${MONGO_PASSWORD}@project-db.duhldeb.mongodb.net/elice-motors?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// 상품 관련 CRUD 라우터를 사용
app.use(
  cors({
    origin: '*', // 모든 도메인에서 요청 허용
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/cars', carRouter); // '/car' 경로로 API 엔드포인트 사용

app.listen(port, () => {
  console.log(`서버가 정상적으로 시작되었습니다. 주소: http://localhost:${port}`);
});
