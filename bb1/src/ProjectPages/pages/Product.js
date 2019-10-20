import React, { Component, useImperativeHandle } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types'
import { ProductConsumer } from '../Context';


// WE NEED TO MAKE THE PRODUCT COMPONENT ACCESIBLE TO ALL COMPONENTS: PRODUCT LIST, CART, DEALS OF THE DAY ..
// HENCE WE WILL  USE CONTEXT API WHERE WE HAVE ONE SOURCE OF TRUTH BUT ACCESSIBLE TO ALL COMPONENTS
export default class Product extends Component {

    state = {
        product : this.props.product
    }
    render(){
        const {product_id, price,product_name,score, img, inCart} = this.props.product;
        console.log(this.props.product.product_id);
        return(
            <ProductWrapper>

                    <div className="img-container p-5"> 
                        <Link to={{pathname:"/admin/details/"+product_id,state : {product:this.props.product}}}>
                            <img src="../../img/product1.jpeg" alt="Product Image" className="card-img-top" ></img></Link> 
                                      
                    {/* Card FOOTER */}
                    <div className="card-footer d-flex justify-content-between">
                        <p className="align-self-center mb-0">{product_name}</p>
                        <h5 className="text-white">
                            <span className="mr-1">Rs</span>
                            {price}
                        </h5>
                    </div>
                    </div>
            </ProductWrapper>
               
        );
    } 
}

Product.propType = {
    product: PropTypes.shape(
        {
            id: PropTypes.number,
            img: PropTypes.string,
            title: PropTypes.string,
            price: PropTypes.number,
            inCart:PropTypes.bool
        }).isRequired
};

const ProductWrapper = styled.div`
.card{
    border-color: transparent;
    transistion: all 1s linear;
}
.card-footer{
    background:transparent;
    border-top:transparent;
    transition: all 1s linear
}
&:hover{
    .card{
        border:0.04rem solid rgba(0,0,0,0.2);
        box-shadow:2px 2px 5px 0px rgba(0,0,0,0.2) 

    }
    .card-footer{
        background: rgba(0,0,7);
    }
}
.img-container{
    position:relative;
    overflow:hidden;
}
.card-img-top{
    transition: all 1 s linear;
}
.img-container:hover .card-img-top{
    transform: scale(1.2);
}
.cart-btn{
    position: absolute;
    bottom:0;
    right:0;
    padding:0,2rem 0.4rem;
    background: var(--lightBlue);
    color: var(--mainWhite);
    border-radius: 0.5rem 0 0;
    transform: translate(100%,100%);   
}
.img-container: hover .cart-btn{
    transform:translate(0,0);
}
.cart-btn:hover{
    color:var(--mainBlue);
}
`;