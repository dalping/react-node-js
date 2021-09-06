if(process.env.NODE_ENV === 'development'){
    module.exports = require('./prod');
}else{ //deploy한 후 : production
    module.exports = require('./dev')
}
