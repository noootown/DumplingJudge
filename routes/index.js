var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport =require('passport'),
    config =require('../config');



var grade=[];
var judge=[];
for(var i=0;i<3;i++){
    var point=[];
    for(var j=0;j<10;j++)
        point.push({
            yum:0,
            creative:0,
            sight:0,
            ok:false
        });
    grade.push({
        yum:0,
        creative:0,
        sight:0,
        point:point
    });
    judge.push({
        yum:0,
        creative:0,
        sight:0
    });
}

function checkNum(num){
    return (num%1===0 && num>=0 && num<=10);
}

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/dashboard', function(req, res) {
    if(!req.isAuthenticated())
        res.redirect('/');
    else
        res.render('dashboard');
});

router.post('/login',passport.authenticate('local'),function(req,res){
    res.redirect('/dashboard');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/senddata',function(req,res){
    if(!req.isAuthenticated())
        return res.status(401).send();
    else{
        try{
            var team=Number(req.body.team)-1;
            var judgeindex=Number(req.user.username.substr(5,1))-1;
            var yum=Number(req.body.yum);
            var creative=Number(req.body.creative);
            var sight=Number(req.body.sight);
            if(grade[judgeindex].point[team].ok===true)
                return res.send('cannot give grade anymore');
            else if(!checkNum(yum) || !checkNum(creative) || !checkNum(sight))
                return res.send('data error');
            else{
                grade[judgeindex].yum=yum;
                grade[judgeindex].sight=sight;
                grade[judgeindex].creative=creative;
                grade[judgeindex].point[team].yum=yum;
                grade[judgeindex].point[team].sight=sight;
                grade[judgeindex].point[team].creative=creative;
                grade[judgeindex].point[team].ok=true;
                judge[judgeindex].yum=yum;
                judge[judgeindex].sight=sight;
                judge[judgeindex].creative=creative;
                return res.send('ok');
            }
        }
        catch(err){
            return res.send('data error');
        }
    }
});
router.get('/getdata',function(req,res){
    var tmp=[];
    for(var i=0;i<grade[0].point.length;i++)
        tmp.push({
            yum:0,
            creative:0,
            sight:0,
            ok:true
        });
    grade.forEach(function(element){
        element.point.forEach(function(element1,index1){
            if(element1.yum===0 && element1.creative===0 && element1.sight===0)
                tmp[index1].ok=false;
            tmp[index1].yum+=element1.yum;
            tmp[index1].sight+=element1.sight;
            tmp[index1].creative+=element1.creative;
        });
    });
    res.send(tmp);
});
router.get('/getjudge',function(req,res){
    res.send(judge);
});
router.get('/testornot',function(req,res){
    User.findOne({username:'test',password:'test'},function(err,data){
        res.send(JSON.parse(JSON.stringify(data)).test);
    });
});
router.get('/tableleader',function(req,res){
    User.findOne({username:'test',password:'test'},function(err,data){
        if(JSON.parse(JSON.stringify(data)).test)
            res.send(['?','?','?','?','?','?','?','?','?','?']);
        else
            res.send(config.teamleader);
    });
});
router.get('/tablemember',function(req,res){
    User.findOne({username:'test',password:'test'},function(err,data){
        if(JSON.parse(JSON.stringify(data)).test)
            res.send([
                    ['?','?','?'],
                    ['?','?','?'],
                    ['?','?','?'],
                    ['?','?','?'],
                    ['?','?','?'],
                    ['?','?','?'],
                    ['?','?','?'],
                    ['?','?','?'],
                    ['?','?','?'],
                    ['?','?','?']
            ]);
        else
            res.send(config.member);
    });
});

module.exports = router;














