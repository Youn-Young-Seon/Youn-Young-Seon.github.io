import React from 'react';
import './App.css';

import {useDispatch, useSelector} from 'react-redux';
import {increment, RootState} from './index'
import {Dispatch} from 'redux'

function App() {
  const 꺼내온거 = useSelector( (state :RootState) => state );
  const dispatch :Dispatch = useDispatch();

  return (
    <div className="App">
      {꺼내온거.count.user}
      {꺼내온거.count.count}
      {/* <button onClick={() => {dispatch({type : '증가'})}}>버튼</button> */} {/*옛날방식*/} 
      <button onClick={() => {dispatch(increment())}}>버튼</button> {/*요즘방식*/}      
    </div>
  );
}

export default App;
