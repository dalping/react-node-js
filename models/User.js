const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10; //salt 몇자리 수?
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save',function(next){
    
    var user = this;

    if(user.isModified('password')){ //password가 변경될 때만 암호화를 수행하라
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err)
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err)

            // Store hash in your password DB.
            user.password = hash //해시된 비밀번호로 교체
            next()
            
            });
        });
    }else{ //비밀번호 변경 아님
        next() 
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //암호화된 비밀번호와 plain암호를 암호화 한것이 같은지 확인한다.
    bcrypt.compare(plainPassword, this.password, function(err,isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
    });
}

userSchema.methods.generateToken = function(cb){
    
    var user = this;
    console.log('user._id',user._id)
    //jsonwebtoken을 이용해서 토큰 생성s
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    });
}

userSchema.statics.findByToken = function(token, cb) {

    var user = this;
    //user._id + '' = token;
    jwt.verify(token, 'secretToken',function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id":decoded, "token":token}, function(err, user){

            if(err) return cb(err);
            cb(null, user)

        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {User} //다른 곳에서도 이 모듈을 쓸 수 있게