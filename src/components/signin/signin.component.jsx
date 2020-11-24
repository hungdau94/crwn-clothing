import React, {useState} from 'react';
import {connect} from 'react-redux';
import "./signin.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {emailSignInStart, googleSignInStart} from "../../redux/user/user.actions";

const SignIn = ({emailSignInStart, googleSignInStart}) => {
    const [userCredential, setCredential] = useState({email: '', password: ''});
    const {email, password} = userCredential;

    const handleChange = event => {
        const {value, name} = event.target;
        setCredential({...userCredential, [name]: value});
    };

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password);
    };

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput name="email"
                           type="email"
                           label="Email"
                           value={email}
                           handleChange={handleChange}
                />

                <FormInput name="password"
                           type="password"
                           label="Password"
                           value={password}
                           required
                           handleChange={handleChange}
                />
                <div className='buttons'>

                    <CustomButton type="submit" value="Submit Form"> SIGN IN </CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignin
                                  value='Sign in with google'> SIGN IN With
                        Google </CustomButton>
                </div>
            </form>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) =>
        dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);
