import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, HashRouter} from 'react-router-dom';
// import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';


let alert초기값 = true;

function reducer2(state = alert초기값, 액션){
  if(액션.type === 'close'){
    state = false;
    return state;
  }
  return state;
}

let 초기값 = [
  // { id: 0, name: '멋진신발', quan: 2},
  // { id: 1, name: '멋진신발2', quan: 1 }
] 

function reducer(state = 초기값, 액션){ // redux 수정
  if(액션.type === '항목추가'){
    let copy = [...state];
    for(let i=0; i<state.length; i++){
      if(state[i].id === 액션.payload.id){
        copy[i].quan += 액션.payload.quan;          
        return copy
      }
    }
    copy.push(액션.payload);
    return copy
  }else if(액션.type === '수량증가'){
    let copy = [...state];    
    copy[0].quan++;
    return copy
  }else if(액션.type === '수량감소'){
    let copy = [...state];
    if(copy[0].quan <= 1){
      alert('0이하 안됌');
      return copy
    }
    copy[0].quan--;    
    return copy
  }else{
    return state
  }
}

let store = createStore(combineReducers({reducer, reducer2})); // redux


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
