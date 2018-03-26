//加载express
const express = require('express');
//调用express的Router方法创建一个路由实例
const router = express.Router();

//加载index
const index = require('./controllers/index');
//加载topic
//const topic = require('./controllers/topic.js');
//加载user
const user = require('./controllers/user');
//配置路由表，路由规则
//首页路由
router
    .get('/',index.index)

    //user.js文件
router
    .get('/login',user.login)
    .post('/login_deal',user.login_deal)
    .get('/register',user.register)
    .post('/register_deal',user.register_deal)
    .post('/logout',user.logout)

//导出router
module.exports = router;

//在app.js中通过app.use路由对象挂载使之生效
