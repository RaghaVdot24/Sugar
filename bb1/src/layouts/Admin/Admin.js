
import React, {Component} from "react";
import { Route, Switch, withRouter } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
//import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
//import Sidebar from "components/Sidebar/Sidebar.jsx";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from "../../routes.js";
import FirstPageSignIn from '../../ProjectPages/pages/SignInForm'
//import logo from "assets/img/react-logo.png";
import {getCurrentUser} from '../../ProjectPages/pages/utils/APIUtils'
import { ACCESS_TOKEN } from '../../ProjectPages/pages/constants/index.js';
import Details from '../../ProjectPages/pages/Details.js';
import Dealsoftheday from '../../ProjectPages/pages/DealsoftheDay';
import Search from '../../ProjectPages/pages/Search'

import { Layout, notification } from 'antd';
const { Content } = Layout;

var ps;

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser:null,
      isAuthenticated: false,
      isLoading: false,
      backgroundColor: "black",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });  
  }
  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
        
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });  
    });
  }

  componentDidMount(){
    console.log("hhahhah");
    this.loadCurrentUser();
  }
  handleLogout(redirectTo="/admin/firstpages-signup") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });
    this.props.history.push(redirectTo); 
  }

  handleLogin() {
    this.loadCurrentUser();
    console.log("hhahhah");
    this.props.history.push("/admin/dealsoftheday");
  }
 

  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  // getBrandText = path => {
  //   for (let i = 0; i < routes.length; i++) {
  //     if (
  //       this.props.location.pathname.indexOf(
  //         routes[i].layout + routes[i].path
  //       ) !== -1
  //     ) {
  //       return routes[i].name;
  //     }
  //   }
  //   return "Brand";
  // };
  render() {
    return (
      <>
        <Layout>
          <Content>
            <Switch>{this.getRoutes(routes)}</Switch>
            <Switch>
              
              <Route exact path="/admin/dealsoftheday" 
                render={(props) => <Dealsoftheday 
                currentUser={this.state.currentUser}/>}>
              
              </Route>
              <Route exact path="/admin/logout"render={(props)=><FirstPageSignIn handleLogout={this.handleLogout}/>}>
              </Route>
              
              <Route path="/admin/firstpages-signin" 
                  render={(props) => <FirstPageSignIn onLogin={this.handleLogin} {...props} />}>
              </Route>
            
              <Route exact path="/admin/details/:userId" component={Details}/>

              <Route exact path="/admin/search" component={Search}/>  

            </Switch>
            <Footer fluid />
          
          </Content>
        </Layout>
         
            )}
      </>
    );
  }
}

export default withRouter(Admin);
