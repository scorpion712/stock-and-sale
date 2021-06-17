import React, { Component } from 'react'
import { BrowserRouter} from 'react-router-dom'
import Cart from '../components/Cart'
import Client from '../components/Client'
import Product from '../components/Product'
import SideMenu from '../components/SideMenu' 
//import ProductScreen from './ProductScreen'

export default class HomeScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            client: null,
            reset_client: false
        }
    }

    handleClient = (client) => {
        if (client.length > 0) { 
            this.setState({client: client[0], reset_client: false});
        }
    }

    resetClient = () => {
        this.setState({client: null, reset_client: true});
    }

    render() {
        return ( 
           <BrowserRouter>
             <div className="content row"> 
                <SideMenu></SideMenu> 
                <div className="col-md-7">
                  <Client handleClient={this.handleClient} reset_client={this.state.reset_client}></Client>  
                  <Product></Product>
                </div>
                <div className="col-md-3">
                    <Cart client={this.state.client} resetClient={this.resetClient}></Cart> 
                </div> 
            </div>   
           </BrowserRouter>
        )
    }
}
