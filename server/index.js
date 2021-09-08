const express = require('express')
const app = express()
const port = 5000

const cookieParser = require('cookie-parser')
const bodyParder = require('body-parser')
const {User} = require('./models/User');
//, useCreateIndex: true, useFindAndModify: false
 const config = require('./config/key')
//application/x-www-form-urlencoded 분석
app.use(bodyParder.urlencoded({extended:true}));
//application/json 분석
app.use(bodyParder.json());
const {auth} = require('./middleware/auth');
app.use(cookieParser());

//mongoDB connect
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser : true, useUnifiedTopology : true //오류 발생 방지
}).then(()=>console.log('MongoDB connected...'))
.catch(err => console.log(err))

app.get('/',(req,res)=>{
    res.send('hello world!')
})

app.post('/api/users/register',(req,res)=>{
    //회원 가입 할 때 필요한 정보들을 client에서 가져오면 db에 넣어준다.
    const user = new User(req.body)
    user.save((err, userInfo)=>{
        if(err) return res.json({success:false, err})
        return res.status(200).json({
            success:true
        })
    })
})

app.post('/api/users/login', (req,res) =>{
    
    //db에서 요청된 이메일을 찾는다
    User.findOne({email:req.body.email},(err,user)=>{

        if(!user){
            return res.json({
                loginSuccess:false,
                err_type:'not_exist_email',
                message:"제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

            user.comparePassword(req.body.password,(err,isMatch) => {

            if(!isMatch) return res.json({
                loginSuccess:false,
                err_type:'wrong_password',
                message:"비밀번호가 틀렸습니다."
            })

            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);

                // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess: true, userId:user._id})
                
            })
        })
    })
})

app.get('/api/users/auth',auth,(req,res)=>{ //미들웨어 : callback 호출하기 전에 중간에 실행
    //여기까지 미들웨어를 통과해 왔다는 얘기는 Auth가 true 라는 말

    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })

})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id},
      {token: ""} //remove token
      , (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true
        })
    })
  })

app.listen(port, ()=> console.log(`Hello! ${port} port!`))
