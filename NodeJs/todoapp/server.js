const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))

const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

const methodOverride = require('method-override');
app.use(methodOverride('_method'))

require('dotenv').config();

const {ObjectId} = require('mongodb');

// var db;
// MongoClient.connect('mongodb+srv://admin:admin123@cluster0.99oln.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(에러, client){
//     // 연결되면 할 일
//     if(에러) return console.log(에러);
//     db = client.db('todoapp');

//     // db.collection('post').insertOne({이름: 'john', _id: 100}, function(에러, 결과){
//     //     console.log('저장완료');
//     // });

//     app.listen(8080, function(){
//         console.log('listening on 8080')
//     });

// })

var db;
MongoClient.connect(process.env.DB_URL, function(에러, client){
    // 연결되면 할 일
    if(에러) return console.log(에러);
    db = client.db('todoapp');

    // db.collection('post').insertOne({이름: 'john', _id: 100}, function(에러, 결과){
    //     console.log('저장완료');
    // });

    app.listen(process.env.PORT, function(){
        console.log('listening on 8080')
    });

})


app.get('/pet', function(request, response){
    response.send('펫용품 쇼핑할 수 있는 페이지입니다.');
})

app.get('/beauty', function(req, res){
    res.send('뷰티용품 사세요');
})

app.get('/', function(req, res){
    // res.sendFile(__dirname + '/index.html')
    res.render('index.ejs')
})

app.get('/write', function(req, res){
    // res.sendFile(__dirname + '/write.html')
    res.render('write.ejs')
})

app.get('/list', function(req, res){    
    db.collection('post').find().toArray(function(error, result){
        console.log(result);
        res.render('list.ejs', {posts: result});
    });

})

app.get('/detail/:id', function(req, res){
    req.params.id = parseInt(req.params.id);
    db.collection('post').findOne({_id: req.params.id}, function(error, result){
        console.log(result);
        res.render('detail.ejs', {data: result});
    })
})

app.get('/edit/:id', function(req, res){    
    db.collection('post').findOne({_id: parseInt(req.params.id)}, function(error, result){
        console.log(result)
        res.render('edit.ejs', { post: result })
    })
})

app.put('/edit', function(req, res){
    db.collection('post').updateOne({_id: parseInt(req.body.id)}, { $set: {제목: req.body.title, 날짜: req.body.date} }, function(error, result){            
        console.log('수정완료');
        res.redirect('/list')
    })
})




const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret: '비밀코드', resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/login', function(req, res){
    res.render('login.ejs');
})

app.post('/login', passport.authenticate('local', {
    failureRedirect: '/fail'
}), function(req, res){
    res.redirect('/')
})

app.get('/mypage', 로그인했니, function(req, res){
    console.log(req.user);
    res.render('mypage.ejs', {사용자 : req.user});
})

function 로그인했니(req, res, next){
    if(req.user){
        next()
    }else{
        // res.send('로그인안하셧는데요?');
        res.redirect('/login')
    }
}

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
  }, function (입력한아이디, 입력한비번, done) {
    //console.log(입력한아이디, 입력한비번);
    db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
      if (에러) return done(에러)
  
      if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
      if (입력한비번 == 결과.pw) {
        return done(null, 결과)
      } else {
        return done(null, false, { message: '비번틀렸어요' })
      }
    }) 
}));

passport.serializeUser(function(user, done){
    done(null, user.id)
})
passport.deserializeUser(function(아이디, done){
    db.collection('login').findOne({id: 아이디}, function(error, result){
        done(null, result);
    })
})

app.post('/register', function(req, res){    
    db.collection('login').insertOne({ id: req.body.id, pw: req.body.pw}, function(error, result){
        res.redirect('/')
    })
})

app.post('/add', function(req, res){
    db.collection('counter').findOne({name: '게시물갯수'}, function(error, result){
        console.log(result.totalPost);
        var 총게시물갯수 = result.totalPost;

        var 저장할거 = {_id: (총게시물갯수 + 1), 작성자: req.user._id, 제목: req.body.title, 날짜: req.body.date}

        db.collection('post').insertOne(저장할거, function(error, result){
            console.log('성공');
            
            db.collection('counter').updateOne({name: '게시물갯수'},{ $inc: {totalPost: 1} },function(error, result){
                if(error) return console.log(error);
            })
        })    
    });
    res.redirect('/list')
})

app.delete('/delete', function(req, res){
    req.body._id = parseInt(req.body._id);

    var 삭제할데이터 = { _id: req.body._id, 작성자: req.user._id}

    db.collection('post').deleteOne(삭제할데이터, function(e, result){
        console.log('삭제완료');
        if (result) return console.log(result);
        res.status(200).send({message: '성공했습니다'}); // 응답코드
        
    })
})


app.get('/search', (req, res) => {
    var 검색조건 = [
        {
            $search: {
              index: 'titleSearch',
              text: {
                query: req.query.value,
                path: '제목'  // 제목날짜 둘다 찾고 싶으면 ['제목', '날짜']
              }
            }
        },
        // { $sort: { _id: 1 } },
        // { $limit: 10 }
        { $project : { 제목: 1, _id: 1, score: { $meta: "searchScore" } } }        
    ]
    db.collection('post').aggregate(검색조건).toArray(function(error, result){
        console.log(result);
        res.render('search.ejs', {posts: result});
    })
})

app.use('/shop', require('./routes/shop.js'));
app.use('/board/sub', require('./routes/board.js'))


let multer = require('multer');
// var storage = multer.memoryStorage({}) // memory 상에 저장 (휘발성)
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/image')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    },
    filefilter: function(req, file, cb){

    }
});

var upload = multer({storage: storage});

app.get('/upload', function(req, res){
    res.render('upload.ejs')
})

app.post('/upload', upload.single('profile'), function(req, res){
    res.send('업로드완료');
});

app.get('/image/:imageName', function(req, res){
    res.sendFile(__dirname + '/public/image/' + req.params.imageName);
})


app.get('/chat', function(req, res){     
    db.collection('chatroom').find().toArray(function(error, result){
        let chatArr = result.filter((a) => {
            for(let i=0; i<a.member.length; i++){
                if(a.member[i].toString() == req.user._id.toString()){
                    return a;
                }
            }
        })
        res.render('chat.ejs', {chatting: chatArr});
    })    
})

app.post('/chat', 로그인했니, function(req, res){    
    let data = {
        title: req.body.title,
        member: [ObjectId(req.body.writer), req.user._id],
        date: new Date()
    }
    db.collection('chatroom').find({member: [ObjectId(req.body.writer), req.user._id]}).toArray(function(error, result){        
        if(result.length !== 0){
            if(result){
                res.redirect('/chat')
            }
        }else{            
            db.collection('chatroom').insertOne(data, function(error, result){
                if(result){
                    res.redirect('/chat')
                }
            })
        }
    })
})