"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
require("./App.css");
var react_redux_1 = require("react-redux");
var index_1 = require("./index");
function App() {
    var 꺼내온거 = (0, react_redux_1.useSelector)(function (state) { return state; });
    var dispatch = (0, react_redux_1.useDispatch)();
    return (<div className="App">
      {꺼내온거.count.user}
      {꺼내온거.count.count}
      {/* <button onClick={() => {dispatch({type : '증가'})}}>버튼</button> */} {/*옛날방식*/} 
      <button onClick={function () { dispatch((0, index_1.increment)()); }}>버튼</button> {/*요즘방식*/}      
    </div>);
}
exports.default = App;
