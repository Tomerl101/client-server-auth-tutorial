import React, { useState } from 'react';

const Form = (params) => {
  const [userTextField, setUserTextField] = useState('');
  const [passwordTextField, setPasswordTextField] = useState('');

  const handleNameChange = (e) => {
    setUserTextField(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordTextField(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    params.addItem({ name: userTextField, password: passwordTextField });
    setUserTextField('');
    setPasswordTextField('');
  };

  return (
    <form onSubmit={handleSubmit} className="input-group my-3">
      <input
        type="text"
        onChange={handleNameChange}
        value={userTextField}
        name="userTextField"
        className="form-control"
        placeholder="User Name..."
        aria-label="Add text here..."
      />
      <input
        type="text"
        onChange={handlePasswordChange}
        value={passwordTextField}
        name="passwordTextField"
        className="form-control"
        placeholder="User Password..."
        aria-label="Add text here..."
      />
      <button type="submit" className="btn btn-primary ml-2">
        Add User
      </button>
    </form>
  );
};

export default Form;
