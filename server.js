const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Express 앱 설정 및 라우팅 추가

app.listen(port, () => {
  console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
