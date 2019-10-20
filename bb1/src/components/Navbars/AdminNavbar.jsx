
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Product  from '../../ProjectPages/pages/Product'
import {Link} from 'react-router-dom'
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  ButtonGroup,
  Nav,
  Container,
  Modal,
  Row,
  Col,
  CardTitle,
  Card,
  CardHeader
} from "reactstrap";

class AdminNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      showPopup:false,
      color: "navbar-transparent",
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
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      });
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent"
      });
    } else {
      this.setState({
        color: "bg-white"
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // // this function is to open the Search modal
  // toggleModalSearch = () => {
  //   this.setState({
  //     modalSearch: !this.state.modalSearch
  //   });
  // };
  render() {
    return (
      <>
        <Navbar
          className={classNames("navbar-absolute", this.state.color)}
          expand="lg"
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.props.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                {this.props.brandText}
              </NavbarBrand>
            </div>
            <button
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navigation"
              data-toggle="collapse"
              id="navigation"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse navbar isOpen={this.state.collapseOpen}>
              <Nav className="ml-auto" navbar>
                <InputGroup className="search-bar">
                  <Link to="/admin/search">
                  <Button
                    color="link"
                    data-target="#searchModal"
                    data-toggle="modal"
                    id="search-button"
                    // onClick={this.toggleModalSearch}
                  >
                    <i className="tim-icons icon-zoom-split" />
                    <span className="d-lg-none d-md-block">Search</span>
                  </Button>
                  </Link>
                </InputGroup>
             
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                    onClick={e => e.preventDefault()}
                  >
                    <div className="photo">
                      <img alt="..." src={require("assets/img/anime3.png")} />
                    </div>
                    <b className="caret d-none d-lg-block d-xl-block" />
                    <p className="d-lg-none">Log out</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">Profile</DropdownItem>
                    </NavLink>
                    <DropdownItem divider tag="li" />
                   
                    <NavLink tag="li">
                    <Link to="/admin/logout">
                      <DropdownItem className="nav-item">Log out</DropdownItem>
                    </Link>
                    </NavLink>

                  </DropdownMenu>
                </UncontrolledDropdown>
                <li className="separator d-lg-none" />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Modal
          modalClassName="modal-search"
          isOpen={this.state.modalSearch}
          toggle={this.toggleModalSearch}
        >
          <div className="modal-header">
            <input id="inlineFormInputGroup" 
            placeholder="SEARCH"
            type="text" 
            onChange={this.handleInputChange}
            value={this.state.query}
            />
            <Link to="/admin/search">
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
            >
              <i className="tim-icons icon-simple-remove" />
            </button>
            </Link>
          </div>     
        </Modal>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-centre"
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
               <Row>
        
                </Row>              
              </Card>
            </Col>
          </Row>
        </div>

      </>
    );
  }
}

export default AdminNavbar;
