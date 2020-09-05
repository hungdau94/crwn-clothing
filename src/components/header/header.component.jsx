import React from 'react';
import {connect} from "react-redux";
import "./header.styles.scss"
import {ReactComponent as Logo} from "../../assets/crown.svg";
import {auth} from "../../firebase/firebase.util";
import CartDropdown from "../cart-dropdown/cart-downdown.component";
import CartIcon from "../cart-icon/cart-icon.component";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {selectCartHidden} from "../../redux/cart/cart.selectors";
import {createStructuredSelector} from 'reselect';
import {HeaderContainer, LogoContainer, OptionLink, OptionsContainer} from "./header.styles";

const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo'></Logo>
        </LogoContainer>

        <OptionsContainer>
            {
                currentUser ?
                    <p className='option'> Hi, {currentUser.displayName}</p> :
                    ''
            }

            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/contact'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                    (<OptionLink as='div' onClick={() => auth.signOut()} to='/'> SIGN OUT </OptionLink>) :
                    (<OptionLink className='option' to='/signin'> SIGN IN </OptionLink>)
            }
            <CartIcon/>
        </OptionsContainer>
        {
            hidden ? null : <CartDropdown/>
        }
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({ // get data from userReducer
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);