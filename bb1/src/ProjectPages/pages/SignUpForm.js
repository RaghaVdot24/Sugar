import React, { Component } from 'react';
import { signup, checkUsernameAvailability, checkEmailAvailability } from './utils/APIUtils';
import {  
  USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from './constants';

import { Form, Input, Button, notification } from 'antd';

import { Link } from 'react-router-dom';

const FormItem = Form.Item;

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          email: {
            value: ''
        },
        username: {
          value: ''
      },
        password: {
            value: ''
        }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleInputChange(event, validationFun) {
      const target = event.target;
      const inputName = target.name;        
      const inputValue = target.value;

      this.setState({
          [inputName] : {
              value: inputValue,
              ...validationFun(inputValue)
          }
      });
  }
  handleSubmit(event) {
    event.preventDefault();

    const signupRequest = {
        email: this.state.email.value,
        username: this.state.username.value,
        password: this.state.password.value
    };
    signup(signupRequest)
        .then(response => {
            notification.success({
                message: 'NAME OF APP IN SOURCE SIGNUP',
                description: "SUCCESFULLY REGISTERED. NOWW LOGIN",
            });          
            this.props.history.push("/admin/firstpages-signin");
        }).catch(error => {
            notification.error({
                message: 'Polling App',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(
            this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );
    }



    render() {
      return (
                // <div className="FormCenter">
                  <Form onSubmit={this.handleSubmit} className="FormFields">
        
                      <FormItem className="FormField"
                        label className="FormField__Label"
                          hasFeedback
                          validateStatus={this.state.username.validateStatus}
                          help={this.state.username.errorMsg}>USERNAME:<br/>
                          <Input
                              className="FormField__Input"
                              size="large"
                              name="username" 
                              autoComplete="off"
                              placeholder="Username"
                              value={this.state.username.value} 
                              onBlur={this.validateUsernameAvailability}
                              onChange={(event) => this.handleInputChange(event, this.validateUsername)} />    
                      </FormItem>
                      <br/>
                      <FormItem className="FormField"
                          label className="FormField__Label"
                          hasFeedback
                          validateStatus={this.state.email.validateStatus}
                          help={this.state.email.errorMsg}>EMAIL:<br/>
                          <Input className="FormField__Input"
                              size="large"
                              name="email" 
                              type="email" 
                              autoComplete="off"
                              placeholder="Your email"
                              value={this.state.email.value} 
                              onBlur={this.validateEmailAvailability}
                              onChange={(event) => this.handleInputChange(event, this.validateEmail)} />    
                      </FormItem>
                      <br/>
                      <FormItem className="FormField"
                          label className="FormField__Label"
                          validateStatus={this.state.password.validateStatus}
                          help={this.state.password.errorMsg}>PASSWORD:<br/>
                          <Input className="FormField__Input"
                              size="large"
                              name="password" 
                              type="password"
                              autoComplete="off"
                              placeholder="A password between 6 to 20 characters" 
                              value={this.state.password.value} 
                              onChange={(event) => this.handleInputChange(event, this.validatePassword)} />    
                      </FormItem>
                      <br/><br/>
                      <FormItem className="FormField">
                          <Button className="FormField__Button mr-20" 
                              htmlType="submit" 
                              size="large" 
                              disabled={this.isFormInvalid()}>Sign up</Button>
                            <Link to="/admin/firtspages-signin" className="FormField__Link">   I'm already member</Link>
                        </FormItem>
                  </Form>
            //   </div>
      );
  }

  // Validation Functions

  validateEmail = (email) => {
      if(!email) {
          return {
              validateStatus: 'error',
              errorMsg: 'Email may not be empty'                
          }
      }

      const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
      if(!EMAIL_REGEX.test(email)) {
          return {
              validateStatus: 'error',
              errorMsg: 'Email not valid'
          }
      }

      if(email.length > EMAIL_MAX_LENGTH) {
          return {
              validateStatus: 'error',
              errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
          }
      }

      return {
          validateStatus: null,
          errorMsg: null
      }
  }

  validateUsername = (username) => {
      if(username.length < USERNAME_MIN_LENGTH) {
          return {
              validateStatus: 'error',
              errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
          }
      } else if (username.length > USERNAME_MAX_LENGTH) {
          return {
              validationStatus: 'error',
              errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
          }
      } else {
          return {
              validateStatus: null,
              errorMsg: null
          }
      }
  }

  validateUsernameAvailability() {
      // First check for client side errors in username
      const usernameValue = this.state.username.value;
      const usernameValidation = this.validateUsername(usernameValue);

      if(usernameValidation.validateStatus === 'error') {
          this.setState({
              username: {
                  value: usernameValue,
                  ...usernameValidation
              }
          });
          return;
      }

      this.setState({
          username: {
              value: usernameValue,
              validateStatus: 'validating',
              errorMsg: null
          }
      });

      checkUsernameAvailability(usernameValue)
      .then(response => {
          if(response.available) {
              this.setState({
                  username: {
                      value: usernameValue,
                      validateStatus: 'success',
                      errorMsg: null
                  }
              });
          } else {
              this.setState({
                  username: {
                      value: usernameValue,
                      validateStatus: 'error',
                      errorMsg: 'This username is already taken'
                  }
              });
          }
      }).catch(error => {
          // Marking validateStatus as success, Form will be recchecked at server
          this.setState({
              username: {
                  value: usernameValue,
                  validateStatus: 'success',
                  errorMsg: null
              }
          });
      });
  }

  validateEmailAvailability() {
      // First check for client side errors in email
      const emailValue = this.state.email.value;
      const emailValidation = this.validateEmail(emailValue);

      if(emailValidation.validateStatus === 'error') {
          this.setState({
              email: {
                  value: emailValue,
                  ...emailValidation
              }
          });    
          return;
      }

      this.setState({
          email: {
              value: emailValue,
              validateStatus: 'validating',
              errorMsg: null
          }
      });

      checkEmailAvailability(emailValue)
      .then(response => {
          if(response.available) {
              this.setState({
                  email: {
                      value: emailValue,
                      validateStatus: 'success',
                      errorMsg: null
                  }
              });
          } else {
              this.setState({
                  email: {
                      value: emailValue,
                      validateStatus: 'error',
                      errorMsg: 'This Email is already registered'
                  }
              });
          }
      }).catch(error => {
          // Marking validateStatus as success, Form will be recchecked at server
          this.setState({
              email: {
                  value: emailValue,
                  validateStatus: 'success',
                  errorMsg: null
              }
          });
      });
  }

  validatePassword = (password) => {
      if(password.length < PASSWORD_MIN_LENGTH) {
          return {
              validateStatus: 'error',
              errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
          }
      } else if (password.length > PASSWORD_MAX_LENGTH) {
          return {
              validationStatus: 'error',
              errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
          }
      } else {
          return {
              validateStatus: 'success',
              errorMsg: null,
          };            
      }
  }

}



export default SignUpForm;