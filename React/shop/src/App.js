import React, {useContext, useState} from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import Detail from './detail.js'
import axios from 'axios';

import { Link, Route, Switch } from "react-router-dom";


export let 재고context = React.createContext();


function App() {

  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    <Switch>

      <Route exact path="/">
        <Jumbotron></Jumbotron>
        <div>메인페이지에요</div>
        <div className="container">

          <재고context.Provider value={재고}>
          <div className="row">
            {
              shoes.map((a, i) => {
                return <Product shoes={shoes[i]} i={i} key={i} />
              })
            }
          </div>
          </재고context.Provider>

          <button className="btn btn-primary" onClick={() => {

            // axios.post('서버 URL', { id: 'codingapple', pw: 1234})
            // .then((result) => {})

            // 로딩중이라는 UI 띄움
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result) => {
              // 로딩중이라는 UI 안보이게 처리           
              let plusShoes = [...shoes, ...result.data];
              shoes변경(plusShoes);
            })
            .catch(() => {
              console.log('실패했어요');
            });

          }}>더보기</button>
        </div>
      </Route>


      <Route path="/detail/:id">

        <재고context.Provider value={재고}>
        <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
        </재고context.Provider>
  
      </Route>


      {/* <Route path="/:id">
        <div>아무거나적었을때 이거 보여주셈</div>
      </Route> */}

    </Switch>

      {/* <Route path="/어쩌구" component={Modal}></Route> */}

    </div>
  );
}

function Product(props){

  let 재고 = useContext(재고context);

  return(    
     <div className="col-md-4">
       <img src={`https://codingapple1.github.io/shop/shoes${props.shoes.id + 1}.jpg`} alt="" width="100%"></img>
       <h4>{props.shoes.title}</h4>
       <p>{props.shoes.content} & {props.shoes.price}</p>
       {/* {재고[props.i]} */}
       <Test></Test>
     </div>    
  )
}

function Test(){
  let 재고 = useContext(재고context);
  return <p>{재고}</p>
}

function Jumbotron(){
  return(
    <div className="jumbotron background">
        <h1>20% Season Off</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
          extra attention to featured content or information.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>      
    </div>
  )
}

export default App;
