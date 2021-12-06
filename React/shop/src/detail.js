import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import styled from 'styled-components';
import './Detail.scss'


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
  
  let [amAlert, amAlert변경] = useState(true);
  let [inputData, inputData변경] = useState('');

    useEffect(() => {
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
              <button className="btn btn-danger">주문하기</button> 
              <button className="btn btn-danger" onClick={ () => {
                //   history.push('/');
                  history.goBack();
              } }>뒤로가기</button> 
            </div>
          </div>
        </div> 
    )
}

export default Detail;