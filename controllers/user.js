//连接数据库
const mysql = require('mysql');

const moment = require('moment');


const connection = mysql.createConnection({
    host:'localhost',  //要连接的主机名
    port:'3309',
    user:'root',   //要连接的数据库的用户名
    password:'123456',  //数据库密码
    database:'ithub-41'  //数据库名

})

exports.register = (req,res)=>{
    res.render('signup.html');
}
exports.register_deal = (req,res)=>{
  //通过req.body获取表单数据
  const body = req.body;
  console.log(body);
  //数据验证
    //普通数据校验，录入数据有没有，格式是否争取
    //业务数据校验，例如校验用户名是否被占用
    //这里校验邮箱和昵称是否被占用
    connection.query('select * from  users where email=?',[body.email],(err,result)=>{
        
        if(err){
            //在开发过程中，遵守错误优先的规则，如果有错，首先报错
            //此时这里的return并不是返回的作用，而是停止程序执行的作用
            //在返回错误信息的时候，一般是按照对象的形式返回信息
            return res.send({
                code:500,
                message:err.message //把错误对象中的错误消息发送给客户端
            })
        }
        if(result[0]){
            return res.send({
                code:1,
                message:'邮箱已被占用了'
            })
        }
        //校验昵称是否存在
        connection.query('select * from users where nickname = ?',[body.nickname],(err,result)=>{
           
            if(err){
                return res.send({
                    code:500,
                    message:err.message  //把错误对象中的错误信息发送给客户端
                })
            }
            if(result[0]){
                return res.send({
                    code:2,
                    message:'昵称已被占用'
                })
            }
            //moment是一个专门处理时间的JavaScript库，这个库既可以在浏览器中使用，也可以在Node中使用
            //moment用来获取当前时
            //format()方法用来格式化输出
            body.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');


            //当昵称和邮箱都没有问题了，就会向数据库添加一条数据
            connection.query('insert into users set ?',body,(err,result)=>{
                
                if(err){
                    //服务器异常，通知客户端
                    return res.send({
                        code:500,
                        message:err.message
                    })
                }

                //注册成功，告诉客户端成功了
                res.send({
                    code:200,
                    message:'注册成功，请登录'
                })

                //用户注册成功之后，需要跳转到首页
                //1.服务器重定向（只对同步请求有效）
                //res.send('注册成功');
                //res.redirect('/)
            })
        })
    })

}


exports.login = (req,res)=>{
    res.send('login');
}
exports.login_deal = (req,res)=>{
    res.send('login_deal');
}

exports.logout = (req,res)=>{
    res.send('logout');
}