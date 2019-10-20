import React, { Component } from 'react';
import Product from "./Product";
import Sidebar  from '../../components/Sidebar/Sidebar';
import routes from '../../routes';

// nodejs library that concatenates classes
import classNames from "classnames";

import '../pages/css/App.css'

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  Row,
  Col
} from "reactstrap";

export default class DealsoftheDay extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          query: '',
          data: [],
          filteredData: []
    
        };
      }
    
    getData = () => {


        // LOADS DATA
        fetch(`http://localhost:8080/all`)
        .then(response => response.json())
          .then(data =>{
            const{query} = this.state;
            // IF WE WANT TO DISPLAY WITHOUT THE SEARCH IE LOADS THE DATA GFOOD FOR FAST USERS;; LOADS BEFORE HANDLE ON CHNAGE TRIGGERS
            const filteredData = data.filter(element =>{
              return element.product_name.toLowerCase().includes(query.toLowerCase());
            });
            this.setState({
              data,
              filteredData
            });
            console.log(this.state.filteredData)
          })
        };
    
        handleInputChange = event => {
          // console.log("HANDLING CHANGES")
          const query = event.target.value;
      
          // FILTERING THE INPUTTED DATA
          this.setState(prevState =>{
            // console.log("filtering data")
            const filteredData = prevState.data.filter(element =>{
              return element.product_name.toLowerCase().includes(query.toLowerCase());     
            });
            return{
              query,
              filteredData
            };
          });
        };
        componentDidMount() {
            window.addEventListener("resize", this.updateColor);
            this.getData();
          }

    render(){
        // AGAIN AND AGAIN CALL
        const {products , isLoading} = this.state;
            if(isLoading) 
                return(<div>is Loading ...</div>);

            return(          
                <div className="wrapper">
              <Sidebar
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            // logo={{
            //   outterLink: "https://www.creative-tim.com/",
            //   text: "Creative Tim",
            //   imgSrc: logo
            // }}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >

<div className="content">

<form>
        <input className="input-box"
          placeholder="Find The Best Deal For Your Product..."
          value={this.state.query}
          onChange={this.handleInputChange}
        />
    
     </form>
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data1"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData("data1")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Compare Prices
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data2"
                          })}
                          onClick={() => this.setBgChartData("data2")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                           Mark Products to Track
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data3"
                          })}
                          onClick={() => this.setBgChartData("data3")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Save Money
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader> 
              </Card>
            </Col>
            <div className="column">
    {this.state.filteredData.map(product=><Product key={product.product_id} product={product} />)} 
        </div>
          </Row>
        </div>
        </div>
        </div>
            );

    } 
}