import React from 'react'
import {connect} from 'react-redux'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { signUpStart } from '../../redux/user/users.actions'
import './sign-up.styles.scss'


class SignUp extends React.Component{
    constructor(){
        super()
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''

        }
    }

    handleSubmit = async event => {
        event.preventDefault()

        const {signUpStart} = this.props

        const {displayName,email,password,confirmPassword} = this.state
        if(password !== confirmPassword){
            alert("passwords doesn't match")
            return
        }

        signUpStart({displayName, email, password})
        
    }

    handleChange = event =>{
        const {value , name} = event.target
        this.setState({[name]: value}) 
    
    }

    render(){
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                         name='displayName'
                         value={ this.state.displayName }
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                        />
                    <FormInput
                        type='email'
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div> 
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp)