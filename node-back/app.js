const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose')
const bodyParser=require('body-parser');
var cookieParser=require('cookie-parser')
const cors=require("cors")
//const expressValidator=require("express-validator");
const app=express();
const routerPost=require('./routes/post')
const routerauth=require('./routes/auth')
const routeruser=require('./routes/users')

app.use(bodyParser.json());
app.use(cookieParser());

app.use(morgan('dev'));
app.use(cors());
//app.use(expressValidator());
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'nodeApi',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,

}, err => err ? console.log(err) : console.log('Connected to database'));
app.use('/',routerPost);
app.use('/',routerauth);
app.use('/',routeruser);


app.use(function(err,req,res,next){
    if(err.name==='UnauthorizedError'){
        res.status(401).send('Unauthorized');
    }
    next();
});


app.listen( 8080,()=>{ console.log("listening on port 8080")}  );
