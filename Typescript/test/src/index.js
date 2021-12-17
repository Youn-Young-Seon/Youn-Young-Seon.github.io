"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementByAmount = exports.decrement = exports.increment = void 0;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
require("./index.css");
var App_1 = require("./App");
var reportWebVitals_1 = require("./reportWebVitals");
var react_redux_1 = require("react-redux");
var toolkit_1 = require("@reduxjs/toolkit");
var 초기값 = { count: 0, user: 'kim' };
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
var counterSlice = (0, toolkit_1.createSlice)({
    name: 'counter',
    initialState: 초기값,
    reducers: {
        increment: function (state) {
            state.count += 1;
        },
        decrement: function (state) {
            state.count -= 1;
        },
        incrementByAmount: function (state, action) {
            state.count += action.payload;
        }
    }
});
var store = (0, toolkit_1.configureStore)({
    reducer: {
        count: counterSlice.reducer
    }
}); // * 요즘 방식 *
// 수정방법 만든 거 export
exports.increment = (_a = counterSlice.actions, _a.increment), exports.decrement = _a.decrement, exports.incrementByAmount = _a.incrementByAmount;
react_dom_1.default.render(<react_1.default.StrictMode>
    <react_redux_1.Provider store={store}>
      <App_1.default />
    </react_redux_1.Provider>
  </react_1.default.StrictMode>, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
