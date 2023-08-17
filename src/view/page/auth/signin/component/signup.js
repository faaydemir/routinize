import React, { useState } from 'react';
import InputError from 'view/component/error-message';

const SignUpForm = ({ onSignUp, errors, }) => {

  const [inputs, setInputs] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    onSignUp && onSignUp({ email: inputs.email, password: inputs.password, passwordAgain: inputs.passwordAgain })
  }
  const handleChange = e => {
    const { name, value } = e.target
    setInputs(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form flex-column align-content-end">
      <h3>Sign Up</h3>
      <label className="form-field-label">email</label>
      <input onChange={handleChange} name="email" placeholder='email' value={inputs.email} />
      <label className="form-field-label">password</label>
      <input onChange={handleChange} name="password" type="password" placeholder='password' value={inputs.password} />
      <label className="form-field-label">password again</label>
      <input onChange={handleChange} name="passwordAgain" type="password" placeholder='password again' value={inputs.passwordAgain} />
      <InputError errors={errors}></InputError>
      <button className="button  primary">sign up</button>

    </form>
  );
};

export default SignUpForm