// express 虽然 package.json 中没有，webpack-dev-server 已经依赖了 ...
let express = require('express');
let morgan = require('morgan');
let app = express();

// 可以用来打印请求的接口
app.use(morgan('dev'));

app.get('/api/users', (req, res) => {
    res.send(req.url);
});

// http://localhost:8080/api/users 会被映射到这里，因为进行了 pathRewrite 
app.get('/users', (req, res) => {
    res.send(req.url);
});

app.listen(3000);