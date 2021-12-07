import React from "react";
import {Table} from 'react-bootstrap'
import {connect} from 'react-redux'

function Cart(props){
    return(
        <div>
            <Table striped bordered hover>                
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경</th>
                </tr>
                {                    
                    props.state.map((a, i) =>{
                    return(
                        <tr key={i}>
                            <td>{a.id}</td>
                            <td>{a.name}</td>
                            <td>{a.quan}</td>
                            <td><button className="btn btn-primary" onClick={() => {
                                props.dispatch({ type: '수량증가' })
                            }}>+</button> &nbsp;
                            <button className="btn btn-danger" onClick={() => {
                                props.dispatch({ type: '수량감소' })
                            }}>-</button>
                            </td>                            
                        </tr>
                        )
                    })
                }
            </Table>
            { props.alert열렸니 === true
            ? <div className="my-alert">
                    <p> 지금 구매하시면 신규할인 20%</p>
                    <button className="btn btn-secondary" onClick={() => {
                        props.dispatch({ type: 'close' });
                    }}>닫기</button>
              </div>
              : null
            }
        </div>
    )
}

function state를props화(state){
    // console.log(state);
    return {
        state: state.reducer,
        alert열렸니: state.reducer2
    }
}

export default connect(state를props화)(Cart)
// export default Cart;