import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/signin-and-signup-page/signin-and-signup-page.component";
import {auth, createUserProfileDocument} from "./firebase/firebase.util"
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";
import CheckoutPage from "./pages/checkout/checkout.component";
import {selectCurrentUser} from "./redux/user/user.selectors";
import {createStructuredSelector} from "reselect";
import {fetchCollectionsStartAsync} from "./redux/shop/shop.actions";


class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const {fetchCollectionsStartAsync, setCurrentUser} = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
            if (user) {
                const userRef = await createUserProfileDocument(user);

                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    });
                })
            }
            setCurrentUser(user)
        });

        fetchCollectionsStartAsync();
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route exact path='/checkout' component={CheckoutPage}/>
                    <Route exact
                           path='/signin'
                           render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}
                    />
                </Switch>
            </div>
        );
    }
}

//user refer to userReducer. In short user = state, but it was
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});


const mapDispatchToProps = dispatch => ({ // setting up stuffs
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
