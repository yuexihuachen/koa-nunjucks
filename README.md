# koa-nunjucks
Use nunjucks.js to dynamically load templates

#### koaNunjucks Params

| searchPaths | Relative path or absolute path    |
| :---:   | :---: |
| opt - watch | if true, the system will automatically update templates. To use watch, make sure optional dependency chokidar is installed. when they are changed on the filesystem   |
| opt - noCache | if true, the system will avoid using a cache and templates will be recompiled every single time   |

```
const Koa = require('koa');
const { koaNunjucks } = require('../dist/index');
const path = require('node:path');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// absolute path - path.resolve('views')
// Relative path - './views'
app.use(
  koaNunjucks(path.resolve('views'), {
    useCache: false,
    async: true,
  })
);

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async (ctx) => {
  ctx.render('index.html', {
    name: 'hello koa nunjucks'
  });
  //ctx.body = 'Hello World';
});

app.listen(3000);

```
