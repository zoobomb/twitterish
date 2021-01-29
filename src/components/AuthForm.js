import { authService } from "myFirebase";
import React, { useState } from "react";

const inputStyle = {};

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    // console.log(event.target.name);
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    // console.log(name, value);
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // i don't want the default things to happen. Let me handle that!
    try {
      let data;
      if (newAccount) {
        // create new account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // login
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit} className='container'>
        <input
          name='email'
          type='email '
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
          className='authInput'
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
          className='authInput'
        />
        <input
          type='submit'
          value={newAccount ? "Create Account" : "Sign  In"}
          className='authInput authSubmit'
        />
        {error && <span className='authError'>{error}</span>}
      </form>
      <span onClick={toggleAccount} className='authSwitch'>
        {newAccount ? "Create Account" : "Sign In"}
      </span>
    </>
  );
};

export default AuthForm;
