import React, { useContext, useEffect, useState } from "react"
import { Nav } from 'react-bootstrap';
import { useHistory, useParams } from "react-router-dom";
import styled from 'styled-components';
import './Detail.scss'
import { 재고context } from './App.js'
import { CSSTransition } from "react-transition-group"
import {connect} from 'react-redux'


let 박스 = styled.div`
padding : 20px;
`;

let 제목 = styled.h4`
font-size : 25px;
color : ${ props => props.색상 };
`;

// class Detail2 extends React.Component{
//     componentDidMount(){
//     }
//     componentWillUnmount(){
//     }
// }


function Detail(props){  

    let 재고 = useContext(재고context);

    let [amAlert, amAlert변경] = useState(true);
    let [inputData, inputData변경] = useState('');

    let [누른탭, 누른탭변경] = useState(0);
    let [스위치, 스위치변경] = useState(false);

    useEffect(() => {

        // axios.get()

        let 타이머 = setTimeout(() => {
            amAlert변경(false);
            return () => {
              clearTimeout(타이머);
            }
        }, 2000)

        return function 어쩌구(){
            // 실행할코드~~~
        }
    });

    // useEffect(() => {});
    // useEffect(() => {});

    let { id } = useParams();
    let history = useHistory();


    let params = parseInt(props.shoes[id].id);

    return(
        <div className="container">
            <박스>
                {/* <제목 색상="blue">안녕하세요1</제목>
                <제목 색상={'red'}>안녕하세요2</제목> */}
                {/* <제목 className="red">안녕하세요</제목> */}
                <input onChange={(e) => { inputData변경(e.target.value) } }/>
                {amAlert === true ? 
                    <div className="my-alert">
                        <p>재고가 얼마 남지 않았습니다</p>
                    </div>
                 : null
                }
            </박스>
          <div className="row">
            <div className="col-md-6">
              <img src={ `https://codingapple1.github.io/shop/shoes${params+1}.jpg` } width="100%" />
            </div>
            <div className="col-md-6 mt-4">
              <h4 className="pt-5">{props.shoes[params].title}</h4>
              <p>{props.shoes[params].content}</p>
              <p>{props.shoes[params].price}원</p>
              <Info 재고={props.재고}/>
              <button className="btn btn-danger" onClick={() => {
                  
                  props.재고변경([9, 10, 11]);
                  props.dispatch({type: '항목추가', payload: {id: 2, name: '새로운상품', quan: 1} });
                  history.push('/cart');

              }}>주문하기</button> &nbsp;
              <button className="btn btn-danger" onClick={ () => {
                //   history.push('/');
                  history.goBack();
              } }>뒤로가기</button> 
            </div>
          </div>

        <Nav variant="tabs" defaultActiveKey="link-0">            
            <Nav.Item>
                <Nav.Link eventKey="link-0" onClick={() => {
                    스위치변경(false);
                    누른탭변경(0);
                }}>Option 0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={() => {
                    스위치변경(false);
                    누른탭변경(1);
                }}>Option 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2" onClick={() => {
                    스위치변경(false);
                    누른탭변경(2);
                }}>Option 2</Nav.Link>
            </Nav.Item>
        </Nav>

        <CSSTransition in={스위치} className="wow" timeout={500}>
          <TabContent 누른탭={누른탭} 스위치변경={스위치변경}></TabContent>
        </CSSTransition>
          
        </div> 
    )
}

function TabContent(props){

    useEffect(() => {
        props.스위치변경(true);
    })

    if(props.누른탭 === 0){
        return <div>0번째 내용입니다.</div>
    }else if(props.누른탭 === 1){
        return <div>1번째 내용입니다.</div>
    }else if(props.누른탭 === 2){
        return <div>2번째 내용입니다.</div>
    }
}

function Info(props){
    return(
        <p>재고: {props.재고[0]}</p>
    )
}

function state를props화(state){
    console.log(state);
    return {
        state: state.reducer,
        alert열렸니: state.reducer2
    }
}

export default connect(state를props화)(Detail)