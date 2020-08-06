import React from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from "./pages/hats/shoppage.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/signin-and-signup-page/signin-and-signup-page.component";
import {auth, createUserProfileDocument} from "./firebase/firebase.util"
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";


class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;
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
                    <Route path='/signin' component={SignInAndSignUpPage}/>
                </Switch>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({ // setting up stuffs
    setCurrentUser: user => dispatch(setCurrentUser(user))
});


export default connect(null, mapDispatchToProps)(App);
