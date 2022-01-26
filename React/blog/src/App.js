/* eslint-disable */

import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  // let [글제목, 글제목변경] = useState('남자 코트 추천'); // [a, b] => [남자 코트 추천, 함수]
  // let [글제목2, 글제목변경2] = useState(['남자 코트 추천2', '강남 우동 맛집']);
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬독학']);
  let [따봉, 따봉변경] = useState(0);
  let [modal, modal변경] = useState(false);
  let [누른제목, 누른제목변경] = useState(0);
  let [입력값, 입력값변경] = useState('');

  let [글텍스트, 글텍스트변경] = useState('');
  

  let css = {color: 'blue', fontSize: '30px'};

  function 제목바꾸기(){
    var newArray = [...글제목];
    newArray[0] = '여자 코트 추천';
    글제목변경(newArray);
  }

  function 제목정렬(){
    var sortArr = [...글제목];
    sortArr.sort((a, b) => {
      if(a > b){
        return 1
      }else if(a < b){
        return -1
      }else{
        return 0
      }
    });
    글제목변경(sortArr);
  }

  function modalChange(){
    if(modal === true){
      modal변경(false);
    }else if(modal === false){
      modal변경(true);
    }
  }

  function 글보냄(param){
    let newArr = [...글제목];
    newArr.unshift(param);
    // newArr.push(param);
    글제목변경(newArr);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div style={ {css} }>개발 Blog</div>        
      </div>
      <button onClick={ 제목바꾸기 }>제목바꾸기</button>
      <button onClick={ 제목정렬 }>제목정렬</button>
      {/* <div className="list">
        <h3>{ 글제목[0] } <span onClick={ () => {따봉변경(따봉 + 1)} }>👍</span>{ 따봉 }</h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3>{ 글제목[1] }</h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3 onClick={() => { modal변경(true) }}>{ 글제목[2] }</h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div> */}

      {
        글제목.map(function(글, i){
          return <div className="list" key={i}>
                    <h3 onClick={() => { 누른제목변경(i) }}>{ 글 }<span onClick={ () => {따봉변경(따봉 + 1)} }>👍</span>{ 따봉 }</h3>
                    <p>2월 17일 발행</p>
                    <hr/>
                  </div>
                 ;
        })
      }

      {/* <button onClick={() => { 누른제목변경(0) }}>버튼1</button>
      <button onClick={() => { 누른제목변경(1) }}>버튼2</button>
      <button onClick={() => { 누른제목변경(2) }}>버튼3</button> */}

      {/* <input onChange={ (e) => { 입력값변경(e.target.value) } }/>
      {입력값} */}

      <div className="publish">
        <input onChange={ (e) => { 글텍스트변경(e.target.value) }} />        
        <button onClick={ () => { 글보냄(글텍스트) }}>저장</button>
      </div>

      <button onClick={ modalChange }>바톤</button>
      <Profile/>
      {
        modal === true
        ? <Modal 글제목={글제목} 누른제목={누른제목}></Modal>
        : null
      }      

    </div>
  );
}

function Modal(props){
    return(
      <div className="modal">
        <h2>{props.글제목[props.누른제목]} </h2>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
    )
}

class Profile extends React.Component {
  constructor(){
    super();
    this.state = { name: 'Kim', age: 30}
  }

  changeName = function() {
    this.setState( {name: 'Park'} );
  }

  render(){
    return (
      <div>
        <h3>프로필입니다</h3>
        <p>저는 { this.state.name }입니다.</p>
        <button onClick={ this.changeName.bind(this) }>버튼</button>
      </div>
    )
  }
}

export default App;
