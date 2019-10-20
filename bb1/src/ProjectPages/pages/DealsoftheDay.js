import React, { Component } from 'react';
import Product from "./Product";
import { async } from 'q';
import {ProductConsumer} from '../Context';
import AdminNavbar  from '../../components/Navbars/AdminNavbar';
import Sidebar  from '../../components/Sidebar/Sidebar';
import routes from '../../routes';

// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.jsx";


export default class DealsoftheDay extends Component {
    
    // EACH PRODUCT HAS A UNIQE STATE
    state = {
        isLoading:true,
        products : []

    }

    // AS SOON AS EVERYTHING IS MOUNTED MAKE THIS ASYNC CALL
    async componentDidMount()
    {
       const response = await fetch('http://localhost:8080/dealsoftheday')
       const body = await response.json();
       this.setState({products :body, isLoading :false});
       console.log(body);
    }

    // getBrandText = path => {
    //     for (let i = 0; i < routes.length; i++) {
    //       if (
    //         this.props.location.pathname.indexOf(
    //           routes[i].layout + routes[i].path
    //         ) !== -1
    //       ) {
    //         return routes[i].name;
    //       }
    //     }
    //     return "Brand";
    //   };

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
            <AdminNavbar
              {...this.props}
              //brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />

<div className="content">
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
            {this.state.products.map(product =>
                            <Product key={product.product_id} product={product} />
                            )}    
          </Row>
        </div>
        </div>
        </div>
            );

    } 
}