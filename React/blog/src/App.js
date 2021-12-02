import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let [글제목, 글제목변경] = useState('남자 코트 추천'); // [a, b] => [남자 코트 추천, 함수]
  // let [글제목2, 글제목변경2] = useState(['남자 코트 추천2', '강남 우동 맛집']);

  let css = {color: 'blue', fontSize: '30px'};
  let posts = '강남 고기 맛집';
  function 함수(){
    return 100
  }
  return (
    <div className="App">
      <div className="black-nav">
        <div style={ {css} }>개발 Blog</div>
      </div>
      <div className="list">
        <h3>{ posts }</h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3>{ 글제목 }</h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>
      <div className="list">
        <h3>{ 글제목 }</h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>
    </div>
  );
}

export default App;
