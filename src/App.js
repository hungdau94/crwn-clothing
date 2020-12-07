import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/signin-and-signup-page/signin-and-signup-page.component";
import {connect} from "react-redux";
import CheckoutPage from "./pages/checkout/checkout.component";
import {selectCurrentUser} from "./redux/user/user.selectors";
import {createStructuredSelector} from "reselect";
import {checkUserSession} from "./redux/user/user.actions";
import AsyncFetch from "./test/customHooks/async.component";
import TestComponent from "./test/general/test.component";


const App = ({checkUserSession, currentUser}) => {
    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/shop' component={ShopPage} />
                <Route exact path='/checkout' component={CheckoutPage} />
                <Route exact
                       path='/signin'
                       render={() => currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}
                />
                <Route exect path='/testAsync' component={AsyncFetch} />
                <Route exect path='/test' component={TestComponent} />
            </Switch>
        </div>
    );
};

//user refer to userReducer. In short user = state, but it was
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
