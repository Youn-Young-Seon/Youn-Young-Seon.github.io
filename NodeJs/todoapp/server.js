const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');

var db;
MongoClient.connect('mongodb+srv://admin:admin123@cluster0.99oln.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(에러, client){
    // 연결되면 할 일
    if(에러) return console.log(에러);
    db = client.db('todoapp');

    // db.collection('post').insertOne({이름: 'john', _id: 100}, function(에러, 결과){
    //     console.log('저장완료');
    // });

    app.listen(8080, function(){
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
    res.sendFile(__dirname + '/index.html')
})

app.get('/write', function(req, res){
    res.sendFile(__dirname + '/write.html')
})

app.post('/add', function(req, res){
    res.send('전송 완료')    
    db.collection('counter').findOne({name: '게시물갯수'}, function(error, result){
        console.log(result.totalPost);
        var 총게시물갯수 = result.totalPost;

        db.collection('post').insertOne({_id: (총게시물갯수 + 1), 제목: req.body.title, 날짜: req.body.date}, function(error, result){
            console.log('성공');

            db.collection('counter').updateOne({name: '게시물갯수'},{ $inc: {totalPost: 1} },function(error, result){
                if(error) return console.log(error);
            })
        })

    });
})

app.get('/list', function(req, res){
    
    db.collection('post').find().toArray(function(error, result){
        console.log(result);
        res.render('list.ejs', {posts: result});
    });

})
