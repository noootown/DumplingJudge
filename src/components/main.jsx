'use strict';
import React, {Component}  from 'react';
//import ReactDOM from 'react-dom';

class Main extends React.Component{
    constructor(){
        super();

        this.state={
            which:0,
            notknow:true,
            login:false,
            tableLeader:['?','?','?','?','?','?','?','?','?','?'],
            member:[]
        };
        this.drawBar=[];
        for(let i=0;i<10;i++)
            this.drawBar[i]=false;
    }
//---------------------Input-----------------------------
    componentDidMount(){
        $('.dumpling-background').slick({
            infinite:true,
            speed:1000,
            fade:true,
            cssEase:'linear',
            autoplay:true,
            arrows:false,
            draggable:false
        });
        window.location=window.location.toString().split('#')[0] + '#target-main';
        var self=this;
        $.ajax({
            url:'./testornot',
            type:'GET',
            success:function(data){
                self.setState({notknow:data});
            }
        });
        $.ajax({
            url:'./tableleader',
            type:'GET',
            success:function(data){
                self.setState({tableLeader:data});
            }
        });
        $.ajax({
            url:'./tablemember',
            type:'GET',
            success:function(data){
                self.setState({member:data});
            }
        });
        setInterval(function(){
            $.ajax({
                url:'./getdata',
                type:'GET',
                success:function(data){
                    data.forEach(function(element,index){
                        if(element.ok===true && self.drawBar[index]===false){
                            self.draw(index+1,element);
                            self.drawBar[index]=true;
                            setTimeout(function(){
                                $('.judge-grade').html('<h4>好吃度：</h4><h4>創意度：</h4><h4>美觀度：</h4>');
                            },60000);
                        }
                    });
                }
            });
            $.ajax({
                url:'./getjudge',
                type:'GET',
                success:function(data){
                    data.forEach(function(element,index){
                        $('#judge'+(index+1)).find('h4').eq(0).html('好吃度：'+element.yum);
                        $('#judge'+(index+1)).find('h4').eq(1).html('創意度：'+element.creative);
                        $('#judge'+(index+1)).find('h4').eq(2).html('美觀度：'+element.sight);
                    });
                }
            });
        },1000);
    }
    incJudge(){
        if(this.state.which<2)
            this.setState({which:this.state.which+1});
    }
    decJudge(){
        if(this.state.which>0)
            this.setState({which:this.state.which-1});
    }
    draw(index,data){
        let barData=[
            {
                'key':'好吃度',
                'value':data.yum
            },
            {
                'key':'創意度',
                'value':data.creative
            },
            {
                'key':'美觀度',
                'value':data.sight
            },
            {
                'key':'',
                'value':30
            }
        ];
        let margin={
            top: 10,
            left: 120,
            right: 50,
            bottom: 20
        };
        let bar=barChart().data(barData).container('#bar'+index).margin(margin).barMargin(25).barHeight(50).barStyle(function(it){
            return it.style({
                'fill':function(it){
                    if(it.key==='好吃度')
                        return 'blue';
                    if(it.key==='創意度')
                        return 'red';
                    else if(it.key==='美觀度')
                        return 'green';
                    else 
                        return 'transparent';
                }
            });
        });
        bar();
        bar.draw();
    }
    render(){
        return(
            <div className={'main'}>
                <div className={'navbar'}>
                    <div className={'container'}>
                        <div className={'nav'}>
                            <a href="#target-main">首頁</a>
                        </div>
                        <div className={'nav'}>
                            <a href="#target-video">影片</a>
                        </div>
                        <div className={'nav'}>
                            <a href="#target-judge">評審</a>
                        </div>
                        <div className={'nav'}>
                            <a href="#target-grade">成績</a>
                        </div>
                        <div className={'nav'}>
                            <a href="#target-table">桌次</a>
                        </div>
                        <div className={'nav'}>
                            <a href="#target-login">登入</a>
                        </div>
                        <div className={'nav'}>
                            <a href="https://github.com/noootown/DumplingJudge">Github</a>
                        </div>
                    </div>
                </div>
                <div id={'target-main'} className={'target'}></div>
                <div id={'target-video'} className={'target'}></div>
                <div id={'target-judge'} className={'target'}></div>
                <div id={'target-grade'} className={'target'}></div>
                <div id={'target-table'} className={'target'}></div>
                <div id={'target-login'} className={'target'}></div>
                <div className={'page-container'}>
                    <div className={'page'} id={'page-main'}>
                        <div className={'dumpling-background'}>
                            <div>
                                <img src="img/dumpling3.jpg" alt=""></img>
                            </div>
                            <div>
                                <img src="img/dumpling2.jpg" alt=""></img>
                            </div>
                            <div>
                                <img src="img/dumpling1.jpg" alt=""></img>
                            </div>
                        </div>
                        <div className={'container'}>
                            <div className={'schedule-block'}>
                                <h1>2016電資水餃暨認親大會</h1>
                                <p>想要跟海外歸國的大四學長姐聊天嗎？想要展現高超的包水餃手藝嗎？想要贏得獎品嗎？
                                    <span style={{textDecoration:'line-through'}}>想要在水餃裡面偷塞辣椒醬陷害同學嗎？</span>
                                    那你絕對不能錯過一年一度的電資包水餃大會!!!
                                </p>
                                <h3>日期：2016/03/27(日)</h3>
                                <h3>時間：18:30</h3>
                                <h3>地點：二餐三樓</h3>
                                <h3>請填表單：
                                    <a href="https://goo.gl/lzaw35">{"https://goo.gl/lzaw35"}</a>
                                </h3>
                            </div>
                            <div className={'schedule-block'}>
                                <h1>時間表</h1>
                                <h3>6:30~7:15 包水餃</h3>
                                <h3>7:15~7:30 影片</h3>
                                <h3>7:30~8:15 開吃囉</h3>
                                <h3>8:15~9:00 評分+頒獎</h3>
                            </div>
                        </div>
                    </div>
                    <div className={'page'} id={'page-video'}></div>
                    <div className={'page'} id={'page-judge'}>
                        <div className={'container'}>
                            <div className={'judge-btn-div'}>
                                <NextBtn 
                                    show={this.state.which}
                                    click={this.incJudge.bind(this)}></NextBtn>
                                <PrevBtn
                                    show={this.state.which}
                                    click={this.decJudge.bind(this)}></PrevBtn>
                            </div>
                            <div className={'photo-slide'}>
                                <Dicky show={this.state.which} notknow={this.state.notknow}></Dicky>
                                <Naima show={this.state.which} notknow={this.state.notknow}></Naima>
                                <Chiwei show={this.state.which} notknow={this.state.notknow}></Chiwei>
                            </div>
                            <Profile show={this.state.which} notknow={this.state.notknow}></Profile>
                        </div>
                    </div>
                    <div className={'page'} id={'page-grade'}>
                        <div className={'team'} id={'judge1'}>
                            {this.state.notknow?<h3>???</h3>:<h3>Dicky</h3>}
                            <div className={'judge-grade'}>
                                <h4>好吃度：</h4>
                                <h4>創意度：</h4>
                                <h4>美觀度：</h4>
                            </div>
                        </div>
                        <div className={'team'} id={'judge2'}>
                            {this.state.notknow?<h3>???</h3>:<h3>奶媽</h3>}
                            <div className={'judge-grade'}>
                                <h4>好吃度：</h4>
                                <h4>創意度：</h4>
                                <h4>美觀度：</h4>
                            </div>
                        </div>
                        <div className={'team'} id={'judge3'}>
                            {this.state.notknow?<h3>???</h3>:<h3>黃老師</h3>}
                            <div className={'judge-grade'}>
                                <h4>好吃度：</h4>
                                <h4>創意度：</h4>
                                <h4>美觀度：</h4>
                            </div>
                        </div>
                        <Team name={this.state.tableLeader[0]} num={1}></Team>
                        <Team name={this.state.tableLeader[1]} num={2}></Team>
                        <Team name={this.state.tableLeader[2]} num={3}></Team>
                        <Team name={this.state.tableLeader[3]} num={4}></Team>
                        <Team name={this.state.tableLeader[4]} num={5}></Team>
                        <Team name={this.state.tableLeader[5]} num={6}></Team>
                        <Team name={this.state.tableLeader[6]} num={7}></Team>
                        <Team name={this.state.tableLeader[7]} num={8}></Team>
                        <Team name={this.state.tableLeader[8]} num={9}></Team>
                        <Team name={this.state.tableLeader[9]} num={10}></Team>
                    </div>
                    <div className={'page'} id={'page-table'}>
                        <div className={'container'}>
                            <Member member={this.state.member[0]} num={1}></Member>
                            <Member member={this.state.member[1]} num={2}></Member>
                            <Member member={this.state.member[2]} num={3}></Member>
                            <Member member={this.state.member[3]} num={4}></Member>
                            <Member member={this.state.member[4]} num={5}></Member>
                            <Member member={this.state.member[5]} num={6}></Member>
                            <Member member={this.state.member[6]} num={7}></Member>
                            <Member member={this.state.member[7]} num={8}></Member>
                            <Member member={this.state.member[8]} num={9}></Member>
                            <Member member={this.state.member[9]} num={10}></Member>
                        </div>
                    </div>
                    <div className={'page'} id={'page-login'}>
                        <div className={'container'}>
                            <form action="/login" method={'post'}>
                                <span>
                                    帳號：<input type="text" name="username" ref="username"></input>
                                </span>
                                <br></br>
                                <br></br>
                                <span>
                                    密碼：<input type="password" name="password" ref="password"></input>
                                </span>
                                <br></br>
                                <br></br>
                                <input type="submit"></input>
                            </form>
                            <a href="./dashboard">dashboard</a>
                        </div>
                    </div>
                </div>
            </div>
          );
    }
}
                            //<form onSubmit={this.handleSubmit.bind(this)}>
                            //<div className={'submitter'}>
                                //<SubmitterBtn num={1} click={this.submitterBtnClick.bind(this)}></SubmitterBtn>
                                //<SubmitterBtn num={2} click={this.submitterBtnClick.bind(this)}></SubmitterBtn>
                                //<SubmitterBtn num={3} click={this.submitterBtnClick.bind(this)}></SubmitterBtn>
                                //<SubmitterBtn num={4} click={this.submitterBtnClick.bind(this)}></SubmitterBtn>
                                //<SubmitterBtn num={5} click={this.submitterBtnClick.bind(this)}></SubmitterBtn>
                                //<SubmitterBtn num={6} click={this.submitterBtnClick.bind(this)}></SubmitterBtn>
                                //<SubmitterBtn num={7} click={this.submitterBtnClick.bind(this)}></SubmitterBtn>
                                //<SubmitterBtn num={8} click={this.submitterBtnClick.bind(this)}></SubmitterBtn>
                                //<SubmitterBtn num={9} click={this.submitterBtnClick.bind(this)}></SubmitterBtn>
                                //<SubmitterBtn num={10} click={this.submitterBtnClick.bind(this)}></SubmitterBtn>
                            //</div>
class Dicky extends Component{
    constructor(){
        super();
    }
    render(){
        if(this.props.notknow){
            if(this.props.show===0)
                return(<div className={'judge-card state0 question'} id={'dicky'}></div>);
            else if(this.props.show===1)
                return(<div className={'judge-card state1 question'} id={'dicky'}></div>);
            else if(this.props.show===2)
                return(<div className={'judge-card state2 question'} id={'dicky'}></div>);
        }
        else{
            if(this.props.show===0)
                return(<div className={'judge-card state0'} id={'dicky'}></div>);
            else if(this.props.show===1)
                return(<div className={'judge-card state1'} id={'dicky'}></div>);
            else if(this.props.show===2)
                return(<div className={'judge-card state2'} id={'dicky'}></div>);
        }
    }
}
class Naima extends Component{
    constructor(){
        super();
    }
    render(){
        if(this.props.notknow){
            if(this.props.show===0)
                return(<div className={'judge-card state0 question'} id={'naima'}></div>);
            else if(this.props.show===1)
                return(<div className={'judge-card state1 question'} id={'naima'}></div>);
            else if(this.props.show===2)
                return(<div className={'judge-card state2 question'} id={'naima'}></div>);
        }
        else{
            if(this.props.show===0)
                return(<div className={'judge-card state0'} id={'naima'}></div>);
            else if(this.props.show===1)
                return(<div className={'judge-card state1'} id={'naima'}></div>);
            else if(this.props.show===2)
                return(<div className={'judge-card state2'} id={'naima'}></div>);
        }
    }
}
class Chiwei extends Component{
    constructor(){
        super();
    }
    render(){
        if(this.props.notknow){
            if(this.props.show===0)
                return(<div className={'judge-card state0 question'} id={'chiwei'}></div>);
            else if(this.props.show===1)
                return(<div className={'judge-card state1 question'} id={'chiwei'}></div>);
            else if(this.props.show===2)
                return(<div className={'judge-card state2 question'} id={'chiwei'}></div>);
        }
        else{
            if(this.props.show===0)
                return(<div className={'judge-card state0'} id={'chiwei'}></div>);
            else if(this.props.show===1)
                return(<div className={'judge-card state1'} id={'chiwei'}></div>);
            else if(this.props.show===2)
                return(<div className={'judge-card state2'} id={'chiwei'}></div>);
        }
    }
}
class NextBtn extends Component{
    constructor(){
        super();
    }
    render(){
        if(this.props.show===2)
            return(<div className={'judge-btn next'} onClick={this.props.click}></div>);
        else
            return(<div className={'judge-btn next active'} onClick={this.props.click}></div>);
    }
}
class PrevBtn extends Component{
    constructor(){
        super();
    }
    render(){
        if(this.props.show===0)
            return(<div className={'judge-btn prev'} onClick={this.props.click}></div>);
        else
            return(<div className={'judge-btn prev active'} onClick={this.props.click}></div>);
    }
}
class Profile extends Component{
    constructor(){
        super();
    }
    render(){
        if(this.props.notknow)
            return(
                    <div className={'profile'}>
                        <h3>姓名：???</h3>
                        <h3>興趣：???</h3>
                        <h3>評分依據：???</h3>
                        <h3>想說的話：???</h3>
                    </div>
                    );
        else if(this.props.show===0)
            return(
                    <div className={'profile'}>
                        <h3>姓名：未知，我只知道他叫Dicky</h3>
                        <h3>興趣：吃東西</h3>
                        <h3>評分依據：看心情</h3>
                        <h3>想說的話：你永遠不知道我在想什麼~</h3>
                    </div>
                    );
        else if(this.props.show===1)
            return(
                    <div className={'profile'}>
                        <h3>姓名：奶媽</h3>
                        <h3>興趣：</h3>
                        <h3>評分依據：</h3>
                        <h3>想說的話：</h3>
                    </div>
                    );
        else if(this.props.show===2)
            return(
                    <div className={'profile'}>
                        <h3>姓名：黃老師</h3>
                        <h3>興趣：當評審喝免費飲料</h3>
                        <h3>評分依據：創新創意創造力</h3>
                        <h3>想說的話：吃水餃就吃水餃弄這麼麻煩(攤手)</h3>
                    </div>
                    );
    }
}
//class SubmitterBtn extends Component{
    //constructor(){
        //super();
        //this.state={
            //active:false
        //};
    //}
    //handleClick(){
        //if(this.props.handleClick(this.props.num)===true)
            //this.setState({active:true});
    //}
    //render(){
        //if(this.state.active===false)
            //return(
                    //<div className={'submitter-btn'} onClick={this.props.click}>{this.props.num}</div>
                  //);
        //else
            //return(
                    //<div className={'submitter-btn active'} onClick={this.props.click}>{this.props.num}</div>
                  //);
    //}

//}
class Team extends Component{
    constructor(){
        super();
    }
    render(){
        if(this.props.name)
            return(
                  <div className={'team'}>
                      <h3>{'桌'+this.props.num+' ('+this.props.name+')'}</h3>
                      <div className={'bar'} id={'bar'+this.props.num}></div>
                  </div>
                  );
        else
             return(
                  <div className={'team'}>
                      <h3>{'桌'+this.props.num}</h3>
                      <div className={'bar'} id={'bar'+this.props.num}></div>
                  </div>
                  );
    }
}
class Member extends Component{
    constructor(){
        super();
    }
    render(){
        if(this.props.member)
            return(
                  <div className={'team'}>
                      <h3>{'第'+this.props.num+'桌'}</h3>
                      <h4>{this.props.member[0]}</h4>
                      <h4>{this.props.member[1]}</h4>
                      <h4>{this.props.member[2]}</h4>
                  </div>
                );
        else
            return (<div></div>);
    }
}
export default Main;
