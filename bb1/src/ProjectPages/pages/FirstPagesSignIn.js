import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignInForm from './SignInForm';
import { Form, Input, Button, Icon, notification } from 'antd';
import { login } from './utils/APIUtils';
const FormItem = Form.Item;

export default class FirstPageSignIn extends Component {
    render(){
        return(    
            <div className="App">     
                <div className="App__Aside"></div>
                    <div className="App__Form">

                    <div className="PageSwitcher">
                            <NavLink to="/firstpages-signin" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                            <NavLink exact to="/firstpages-signup" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
                    </div>   

                    <div className="FormTitle">

                            <NavLink to="/firstpages-signin" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
                    </div>
                        <Route component={SignInForm}>
                        </Route>
                        <Route exact path="/firstpages-signin" component={SignInForm}>
                        </Route>   
                    </div>  
            </div> 
        );

    } 
}