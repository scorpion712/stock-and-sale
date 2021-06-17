import React, { Component } from 'react'
import SideMenu from '../components/SideMenu'
import Fade from 'react-reveal/Fade'
import SalesList from '../components/SalesList'

export default class SalesScreen extends Component {
    render() {
        return (
            <div className="content row">
                <SideMenu></SideMenu> 
                <div className="col-md-10 product">
                    <Fade>
                            <h2>Facturación</h2>
                            <hr></hr> 
                    </Fade>
                    <SalesList></SalesList>
                </div>  
            </div>
        )
    }
}
