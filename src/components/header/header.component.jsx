import React from 'react';
import {connect} from "react-redux";
import "./header.styles.scss"
import {ReactComponent as Logo} from "../../assets/crown.svg";
import {Link} from "react-router-dom";
import {auth} from "../../firebase/firebase.util";

const Header = ({currentUser}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'></Logo>
        </Link>

        <div className='options'>
            {
                currentUser ?
                    <p className='option'> Hi, {currentUser.displayName}</p> :
                    ''
            }

            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            {
                currentUser ?
                    (<Link className='option' onClick={() => auth.signOut()} to='/'> SIGN OUT </Link>) :
                    (<Link className='option' to='/signin'> SIGN IN </Link>)
            }
        </div>
    </div>

);

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);