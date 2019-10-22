
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
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
} from "../variables/charts.jsx";

import Product from '../ProjectPages/pages/Product'
import FormItem from "antd/lib/form/FormItem";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
      isLoading:true,
    products : []
    };
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };

   // AS SOON AS EVERYTHING IS MOUNTED MAKE THIS ASYNC CALL
   async componentDidMount()
   {
      const response = await fetch('http://localhost:8080/dealsoftheday')
      const body = await response.json();
      this.setState({products :body, isLoading :false});
      console.log(body);
   }

  
  render() {
    const {products , isLoading} = this.state;
            if(isLoading) 
                return(<div>is Loading ...</div>);
    return (
      <>
      </>
    );
  }
}

export default Dashboard;
