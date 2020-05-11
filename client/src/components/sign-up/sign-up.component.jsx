import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createUserStart } from '../../redux/user/user.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { SignUpContainer, TitleContainer } from './sign-up.styles.jsx';

const SignUp = ({ createUserStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    displayName: '',
    password: '',
    confirmPassword: '',
  });

  const { displayName, email, password, confirmPassword } = userCredentials;
  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match!");
      return;
    }

    createUserStart({ displayName, email, password });
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignUpContainer>
      <TitleContainer>I do not have an account</TitleContainer>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          label='Confirm Password'
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </SignUpContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  createUserStart: user => dispatch(createUserStart(user)),
});

export default connect(null, mapDispatchToProps)(SignUp);
