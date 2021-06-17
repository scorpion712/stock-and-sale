import React, { Component } from 'react'
import SideMenu from '../components/SideMenu'
import Fade from 'react-reveal/Fade'
import Cash from '../components/Cash'
import PrinterHead from '../printer/PrinterHead'
import printJS from 'print-js'

export default class CashScreen extends Component {
    render() {
        
        const someJSONdata = [
            {
            name: 'John Doe',
            email: 'john@doe.com',
            phone: '111-111-1111'
            },
            {
            name: 'Barry Allen',
            email: 'barry@flash.com',
            phone: '222-222-2222'
            },
            {
            name: 'Cool Dude',
            email: 'cool@dude.com',
            phone: '333-333-3333'
            }
        ];

        return (
            <div className="content row">
            <SideMenu></SideMenu>
            <div className="col-md-10 product">
                <Fade>
                        <h2>Caja del día {new Date().toLocaleDateString("es-ES")}</h2>
                        <hr></hr> 
                        <button className="btn btn-success" onClick={() => 
                            printJS({
                                printable: someJSONdata,
                                type: 'json',
                                properties: ['name', 'email', 'phone'],
                                header: "<div class=\"ticket\">"
                                        + "<p class=\"centered\">"+
                                                "AMATUCCI CARLOS OSCAR <br>"+
                                                "C.U.I.T. NRO.: 20-16620423-3 <br>"+
                                                "MARIANO MORENO 899 GRAL PIRAN BSAS <br>"+
                                                "ORIENT AL CONSUMID BSAS 0800-222-9042 <br>"+
                                                "IVA RESPONSABLE INCSCRIPTO"+
                                            "</p>"+
                                        "</div>",
                                style: ' .ticket {width: 30rem;max-width: 30rem;}'+
                                        '.centered {text-align: center;align-content: center;}'
                            })
                        }>Cierre Caja X</button>
                        <button className="btn btn-primary"  onClick={() => alert("Imprimir ticket cierre Z")}>Cierre Caja Z</button>
                </Fade> 
                <Fade bottom>
                    <Cash></Cash>
                </Fade>
            </div>  
        </div>
        )
    }
}
