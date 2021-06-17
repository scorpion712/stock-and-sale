 
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';  
import AccountScreen from './screens/AccountScreen';
import CashScreen from './screens/CashScreen';
import ClientScreen from './screens/ClientScreen';
import HomeScreen from './screens/HomeScreen'; 
import ProductScreen from './screens/ProductScreen';
import ProviderScreen from './screens/ProviderScreen';
import SalesScreen from './screens/SalesScreen';
import store from './store';

function App() { 
  return (
    <Provider store={store}>
      <BrowserRouter> 
            <div className="grid-container">
              <header className="row">
                  <div>
                      <a href="/">Sistema de Facturación  -   Ferretería EL RUSO</a>
                  </div>
                  <div>
                      <a href="/cash"><i className="fas fa-cash-register icon"></i>Ver caja</a> 
                  </div>
              </header>
              <main> 
              <Switch>
                <Route path="/" component={HomeScreen} exact></Route> 
                <Route path="/products" component={ProductScreen} exact ></Route>
                <Route path="/clients" component={ClientScreen} exact ></Route> 
                <Route path="/sales" component={SalesScreen} exact ></Route> 
                <Route path="/providers" component={ProviderScreen} exact ></Route> 
                <Route path="/accounts" component={AccountScreen} exact></Route>
                <Route path="/cash" component={CashScreen} exact></Route>
              </Switch>
              </main>
              <footer className="row center">2021 ©</footer>
            </div> 
          </BrowserRouter>
    </Provider>
    
    
  );
}

export default App;
