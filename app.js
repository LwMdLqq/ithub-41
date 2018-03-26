//加载express
const express = require('express');
  //加载获取表单第三方包
  var bodyParser = require('body-parser');
//调用express(),得到一个app,可以发送get或者post请求
const app = express();
//加载router
const router = require('./router');

//配置使用art-template模板引擎
//只要经过该配置，那么你就可以使用res.render方法渲染文件了
//res.render默认访问views文件下的.html后缀的文件
    //render的功能：
    //  1.读取翻译模板
    //  2.使用art-templte模板引擎解析替换
    //  3.发送解析替换之后的内容结果
//第一个参数用来配置视图的后缀名，这里是html,则你存储在views目录中的模板文件必须是xxx.html
//render方法的本质是将读取文件和模板引擎渲染这件事封装起来

app.engine('html',require('express-art-template'));

//公开目录资源
 app.use('/public',express.static('./public/'))
 app.use('/node_modules',express.static('./node_modules'));

 //配置body-parser解析表单POST请求体
 //只有配置了该插件，就可以在请求处理函数中使用req.body来访问请求体数据了
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use(router);
//监听端口号，启动Web服务
app.listen(3000,()=>console.log('3000 running...'));
