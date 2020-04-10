import express from 'express';

const app: express.Express = express();

// CORSの許可
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-type, Accept");
  next();
});

// body-parserに基づいた着信リクエストの解析
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ルーティング
const router : express.Router = express.Router();
router.get('/api/getTest', (req: express.Request, res: express.Response) => {
  res.send(req.query);
});

router.post('/api/postTest', (req: express.Request, res: express.Response) => {
  res.send(req.body);
});

app.use(router);

// 3000 port でlisten
app.listen(
  3000, 
  () => {
    console.log('Example app listeing on port 3000!');
  }
);