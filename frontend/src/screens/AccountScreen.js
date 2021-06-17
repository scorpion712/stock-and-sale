import React, { Component } from 'react'
import SideMenu from '../components/SideMenu'
import Fade from 'react-reveal/Fade'
import AccountsList from '../components/AccountsList'

export default class AccountScreen extends Component {
    render() {
        return (
            <div className="content row">
                <SideMenu></SideMenu>
                <div className="col-md-10 product">
                    <Fade>
                            <h2>Cuentas corrientes</h2>
                            <hr></hr> 
                    </Fade>
                    <AccountsList></AccountsList>
                </div>  
            </div>
        )
    }
}
