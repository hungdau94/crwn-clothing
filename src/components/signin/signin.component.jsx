import React from 'react';
import "./signin.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {auth, signInWithGoogle} from "../../firebase/firebase.util";

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "email": '',
            "password": ''
        }
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email"
                               type="email"
                               label="Email"
                               value={this.state.email}
                               handleChange={this.handleChange}
                    />

                    <FormInput name="password"
                               type="password"
                               label="Password"
                               value={this.state.password}
                               required
                               handleChange={this.handleChange}
                    />
                    <div className='buttons'>

                        <CustomButton type="submit" value="Submit Form"> SIGN IN </CustomButton>
                        <CustomButton type='button' onClick={() => signInWithGoogle()} isGoogleSignin
                                      value='Sign in with google'> SIGN IN With
                            Google </CustomButton>
                    </div>
                </form>
            </div>
        )
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {email, password} = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({"email":'', "password": ''});

        } catch (error) {
            console.log("Login failed. Please check your email and password", error)
        }
    }
};

export default SignIn;
