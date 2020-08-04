import React from 'react';

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
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            {
                currentUser ?
                    (<Link className='option' onClick={() => auth.signOut()}> SIGN OUT </Link>) :
                    (<Link className='option' to='/signin'> SIGN IN </Link>)

            }
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
        </div>
    </div>

);

export default Header;