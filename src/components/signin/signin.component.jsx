import React from 'react';
import "./signin.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {signInWithGoogle} from "../../firebase/firebase.util";

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
                               oninvalid={() => this.setCustomValidity('Quý khách cần địa chỉ email hợp lệ')}
                    />

                    <FormInput name="password"
                               type="password"
                               label="Password"
                               value={this.state.password}
                               required
                               handleChange={this.handleChange}
                               label='password'
                    />
                    <CustomButton type="submit" value="Submit Form"> SIGN IN </CustomButton>
                    <CustomButton onClick={() => signInWithGoogle()} value='Sign in with google'> SIGN IN With
                        Google </CustomButton>
                </form>
            </div>
        )
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({email: "", "password": ''})
    }
};

export default SignIn;
