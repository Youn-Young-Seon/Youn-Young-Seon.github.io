import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

const 초기값 :{count :number, user: string} = { count: 0, user: 'kim' };

// function reducer(state = 초기값, action :{type :string}) {
//   if (action.type === '증가') {
//     return { count : state.count + 1 }
//   } else if (action.type === '감소'){
//     return { count : state.count - 1 }
//   } else {
//     return 초기값
//   }
// } 
// const store = createStore(reducer); * 옛날방식 * 

const counterSlice = createSlice({
  name: 'counter',
  initialState : 초기값,
  reducers: {
    increment (state){
      state.count += 1
    },
    decrement (state){
      state.count -= 1
    },
    incrementByAmount (state, action :PayloadAction<number>){
      state.count += action.payload
    }
  }
})

let store = configureStore({
  reducer: {
    count : counterSlice.reducer
  }
}) // * 요즘 방식 *

// store의 타입 미리 export 해두기
export type RootState = ReturnType<typeof store.getState>

// 수정방법 만든 거 export
export let {increment, decrement, incrementByAmount} = counterSlice.actions

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
