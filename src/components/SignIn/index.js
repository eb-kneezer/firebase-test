import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { SignUpLink } from '../SignUp'
import {PasswordForgetLink} from '../PasswordForget'

import {compose} from 'recompose'

import {WithFirebase} from '../Firebase'
import * as ROUTES from '../../constants/routes'

const SignInPage = () => (
    <div>
        <h1>Sign In</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink/>

    </div>
)

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props)

        this.state = {...INITIAL_STATE}
    }

    onSubmit = event => {
        const {email, password} = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({error})
            })

        event.preventDefault();
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        const {email, password, error} = this.state;
        
        const isInvalid = password === '' || email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input 
                    type="text" 
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    placeholder='Email Address'
                 />
                <input 
                    type="password" 
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    placeholder='Password'
                 />
                 <button disabled={isInvalid} type="submit">Sign In</button>

                 {error && <p>{error.message}</p>}
            </form>
        )
    }

}

const SignInForm = compose(withRouter,WithFirebase)(SignInFormBase)

export {SignInForm}
export default SignInPage;