import React, { Component } from 'react';
import { login } from './utils/APIUtils';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { ACCESS_TOKEN } from './constants';
import "./css/App.css"

import { Form, Input, Button, Icon, notification } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (

                    <AntWrappedLoginForm onLogin={this.props.onLogin} />
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();   
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.onLogin()
            
                }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: 'Sugar',
                            description: 'Your Username or Password is incorrect. Please try again!'
                        });                    
                    } else {
                        notification.error({
                            message: 'Sugar',
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });                                            
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="App">     
                <div className="App__Aside"></div>
                    <div className="App__Form">

                    <div className="PageSwitcher">
                            <NavLink to="/admin/firstpages-signin" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                            <NavLink exact to="/admin/firstpages-signup" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
                    </div>   

                    <div className="FormTitle">

                            <NavLink to="/admin/firstpages-signin" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
                    </div>
            <Form className="FormCenter">
                  <Form onSubmit={this.handleSubmit} className="FormFields">
        
                  <FormItem className="FormField"
                      label className="FormField__Label">Username/Email:<br/>
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{ required: true, message: 'Please input your username or email!' }],
                    })(
                    <Input className="FormField__Input" 
                        size="large"
                        name="usernameOrEmail" 
                        placeholder="Username or Email" />    
                    )}
                </FormItem>
                <br/>
                <FormItem className="FormField"
                      label className="FormField__Label">Password:<br/>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input className="FormField__Input" 
                        size="large"
                        name="password" 
                        type="password" 
                        placeholder="Password"  />                        
                )}
                </FormItem>
                <br/><br/>
                <FormItem className="FormField">
                          <Button className="FormField__Button mr-20" htmlType="submit" size="large" >Login</Button>
                    Or <Link to="/admin/firstpages-signup" className="FormField__Link">Register now!</Link>
                </FormItem>
                </Form>
            </Form>
            </div>
            </div>
        );
    }
}


export default Login;