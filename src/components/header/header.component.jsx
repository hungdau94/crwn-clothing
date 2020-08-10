import React from 'react';
import {connect} from "react-redux";
import "./header.styles.scss"
import {ReactComponent as Logo} from "../../assets/crown.svg";
import {Link} from "react-router-dom";
import {auth} from "../../firebase/firebase.util";
import CartDropdown from "../cart-dropdown/cart-downdown.component";
import CartIcon from "../cart-icon/cart-icon.component";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {selectCartHidden} from "../../redux/cart/cart.selectors";
import {createStructuredSelector} from 'reselect';

const Header = ({currentUser, hidden}) => (
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
            <CartIcon/>
        </div>
        {
            hidden ? null : <CartDropdown/>
        }

    </div>

);

const mapStateToProps = createStructuredSelector({ // get data from userReducer
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);