import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {ProductConsumer} from '../Context'
export default class Details extends Component {
    state = {
        product : this.props.location.state.product
    };
    
    
    render(){
        console.log(this.state.product)
        return(     
                        <div className="container py-5">
                            <div className="row">
                            <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                <h1>{this.state.product.product_name}</h1>
                            </div>
                            </div>

                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                    <img src="../../../public/img/product1.png" className="img-fluid" alt="Product"></img>
                                </div> 

                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2>model: {this.state.product.product_name}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                        Made By: <span className="text-uppercase">
                                        var brand</span>
                                    </h4>
                                    <h4 className="text-blue">
                                        <strong>
                                            price:<span></span>     
                                        </strong>
                                    </h4>
                                    <p className="text-capitalize font-weight-bold m-3 mb-0">
                                        DETAILS: 
                                    </p>   
                                    <p className="text-capitalize font-weight-bold m-3 mb-0">{this.state.product.product_desc}</p>
                                        <div>
                                        <Link to="/dealsoftheday">
                                            {/* <Button>
                                                BACK TO PRODUCT LIST
                                            </Button> */}
                                                    </Link>    
                                            {/*<ButtonContainer cart 
                                                disabled={inCart ? true : false}
                                                onClick={() => 
                                                    {
                                                        value.addToCart(id);
                                                    }}>
                                                {inCart ? "inCart": "add to cart"}
                                            </ButtonContainer>  */}
                                         </div> 
                                </div>
                            </div>
                        </div>

        )
    }
}
