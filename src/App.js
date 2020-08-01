import React from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from "./pages/hats/shoppage.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/signin-and-signup-page/signin-and-signup-page.component";


function App() {
    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/shop' component={ShopPage}/>
                <Route path='/signin' component={SignInAndSignUpPage}/>
            </Switch>
        </div>
    );
}

export default App;
