import express from 'express';

const app: express.Express = express();
const swagger = require('swagger-ui-dist').absolutePath();
const swaggerJSDoc = require('swagger-jsdoc');

// CORSの許可
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-type, Accept");
  next();
});

// body-parserに基づいた着信リクエストの解析
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// swagger-uiを表示するパス
app.use('/swagger', express.static(swagger));

// swagger-jsdocの設定
const options = {
  swaggerDefinition: {
    info: {
      title: 'Sample App',
      version: '1.0.0'
    },
    basePath: '/api',
    url: "http://localhost:3000/api-docs.json",
    schemes: [ 'http' ]
  },
  apis: ['./openapi.yml']
}
const swaggerSpec = swaggerJSDoc(options);

// ルーティング
const router: express.Router = express.Router();
router.get('/api/getTest', (req: express.Request, res: express.Response) => {
  res.send(req.query);
});

router.post('/api/postTest', (req: express.Request, res: express.Response) => {
  res.send(req.body);
});

// swagger-jsdoc用のjsonを吐き出すroute
router.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(router);

// 3000 port でlisten
app.listen(
  3000, 
  () => {
    console.log('Example app listeing on port 3000!');
  }
);