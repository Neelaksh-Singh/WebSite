import React, {useState} from 'react';
import  { connect } from 'react-redux'

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

//import { auth , signInWithGoogle } from "../../firebase/firebase.utils.js"
import {googleSignInStart, emailSignInStart} from '../../redux/user/users.actions'

import './sign-in.styles.scss';

const SignIn = ({emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setUserCredentials] = useState({email: '' , password: ''})

  const { email , password } = userCredentials

  const handleSubmit = async event => {
    event.preventDefault();   

    emailSignInStart(email,password)
    // try {
    //   await auth.signInWithEmailAndPassword( email , password)
    // } catch (error) {
    //   console.error(error);
    // }

    
    
  };

  const handleChange = event => {
    const { value, name } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={handleChange}
            value={email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={password}
            handleChange={handleChange}
            label='password'
            required
          />
          <div className='buttons'> 
            <CustomButton type='submit'> Sign in </CustomButton>
            <CustomButton type='button' onClick={googleSignInStart} isGoogleButton>Google Sign In </CustomButton>
          </div>
        </form>

      </div>
    );
  }


const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart:  (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
