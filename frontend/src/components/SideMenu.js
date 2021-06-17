import React, { Component } from 'react';
import {Link} from 'react-router-dom';   

export default class SideMenu extends Component {
    render() {
        return ( 
            <div className="col-md-2 menu"> 
                <div className="menu"> 
                    <li className="menu-menu d-lg-none d-xl-none d-md-none text-center">
                        Menú
                        <i className="fas fa-bars icon"></i>
                    </li>
                    <Link to="/">
                        <li className="menuLinks d-none d-md-block d-lg-block d-xl-block">
                            <i className="fas fa-cart-plus icon"></i> Nueva Venta 
                        </li> 
                    </Link>
                    <a href="/products">
                        <li className="menuLinks d-none d-md-block d-lg-block d-xl-block">
                            <i className="fas fa-cubes icon"></i> Artículos
                        </li>
                    </a> 
                    <a href="/providers">
                        <li className="menuLinks d-none d-md-block d-lg-block d-xl-block">
                            <i className="fas fa-dolly icon"></i> Proveedores
                        </li>
                    </a> 
                    <a href="/clients">
                        <li className="menuLinks d-none d-md-block d-lg-block d-xl-block">
                            <i className="fas fa-users icon"></i> Clientes 
                        </li> 
                    </a> 
                    <a href="/sales">
                        <li className="menuLinks d-none d-md-block d-lg-block d-xl-block">
                            <i className="fas fa-file-invoice-dollar icon"></i> Facturación 
                        </li>
                    </a> 
                    <a href="/accounts">
                        <li className="menuLinks d-none d-md-block d-lg-block d-xl-block">
                            <i className="fas fa-book icon"></i> Cuentas
                        </li>
                    </a> 
                </div>
                <div className="menu-complete  d-none d-md-block d-lg-block d-xl-block">
                </div>
            </div>     
        )
    }
}
