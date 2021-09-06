const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength: 50
    },
    email: { 
        type:String,
        trim:true, //공백 삭제
        unique: 1
    },
    password:{
        type:String,
        maxlength: 50
    },
    role:{//관리자&일반유저
        type:Number,
        default:0 //값을 입력하지 않을 시 디폴트 값
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{//토큰을 사용할 수 있는 기간
        type:Number
    }
})

const User = mongoose.model('User', userSchema)
module.exports = {User} //다른 곳에서도 이 모듈을 쓸 수 있게