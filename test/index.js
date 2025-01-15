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
