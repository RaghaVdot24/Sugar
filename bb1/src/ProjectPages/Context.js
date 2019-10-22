
import React , {Component} from 'react'
import {storeProducts, detailProduct} from './Data';
//import axios from 'axios';

// WE NEED TO MAKE THE PRODUCT COMPONENT ACCESIBLE TO ALL COMPONENTS: PRODUCT LIST, CART, DEALS OF THE DAY ..
// HENCE WE WILL  USE CONTEXT API WHERE WE HAVE ONE SOURCE OF TRUTH BUT ACCESSIBLE TO ALL COMPONENTS
// FOR MULTIPLE EXPORTS

// CREATING NEW CONTEXT OBJECTS
const ProductContext = React.createContext();
const MAIN_URL = 'localhost:8080';

// THE CONTEXT HAS TWO PARTS THE PROVIDER NAD THE CONSUMER

class ProductProvider extends Component {

    state = {
        products:[],
        detailProduct:detailProduct
    };

    constructor(props){
        super(props)
    }

    // TO MAKE SURE IF VALUE IS CHANGED IN ONE PLACE IT IS ALSO CHANGED IN OTHE RPLACES;; MOST PROBABLY WONT NEED IT BECAUUUSE DB SAMBHAAAL LEGA

    // getAll(){
    //     console.log("hi");
    //     axios.get('localhost:8080/all/')
    //     .then(function(p_data){
    //             this.setState({products:p_data.data})
    //             console.log(this.state.products);
    //         },function(response){console.log(response);});
    // }

    // componentDidMount(){
    //     this.getAll();

    // }
    // setProducts = () =>{
    //     let tempProducts = [];
    //     storeProducts.forEach(item =>{

    //         const singleItem = {...item};
    //         tempProducts = [...tempProducts, singleItem]            
    //     });
    //     this.setState(()=>{
    //         return{products: tempProducts};
    //     })
    // }

    getItem = id =>{

        const product = this.state.products.find(item => item.id == id);
        console.log(product);
        return product;
    };

    //////////////////////////////////////////////////////////////
    handleDetail = id =>{
            const product = this.getItem(id)
            return{detailProduct:product};
            //this.set
            console.log("HELLO FROM DETAIL. YOUR PRODUCT IS BEING HANDLED");

    }


    addToCart = (id) =>{
            console.log("PRODUCT ADDED TO CART");

    }
    render(){
        return(
            <ProductContext.Provider value={{

            ...this.state, 
            handleDetail:this.handleDetail,
            addToCart:this.addToCart,
            getAll:this.getAll              
            }
            }>
                {this.props.children}
                {/* SINCE PRODUCT   PROVIDER WILL BE SITTING AT TOP OF ALL WE NEED TO RETURN INTS CHILDREN */}
            </ProductContext.Provider>
        );

    } 
}

const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductProvider };