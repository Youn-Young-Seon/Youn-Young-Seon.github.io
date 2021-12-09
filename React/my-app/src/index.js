import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, HashRouter} from 'react-router-dom';
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
  { id: 0, name: 'White and Black', quan: 2},
  { id: 1, name: 'Red Knit', quan: 1 }
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
    console.log(액션.payload.status.i);
    let copy = [...state];
    copy[액션.payload.status.i].quan++;
    return copy
  }else if(액션.type === '수량감소'){
    let copy = [...state];
    if(copy[액션.payload.status.i].quan <= 1){
      alert('0이하 안됌');
      return copy
    }
    copy[액션.payload.status.i].quan--;    
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
