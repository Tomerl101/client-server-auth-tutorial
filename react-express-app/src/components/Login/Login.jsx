import React, { useState } from 'react';
import Form from './Form';
import WarningMessage from '../WarningMessage';
import CONSTANTS from '../../constants';

const Login = () => {
  const [isRegister, setRegister] = useState(['Please Login...']);
  const [warningMessage, setWarningMessage] = useState({ warningMessageOpen: false, warningMessageText: '' });

  const handleLogin = (user) => {
    // Warning Pop Up if the user submits an empty message
    if (!user) {
      setWarningMessage({
        warningMessageOpen: true,
        warningMessageText: CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE,
      });
      return;
    }

    console.log(user);
    fetch('http://localhost:4000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.text();
      })
      .then((textResponse) => {
        console.log(textResponse);
        setRegister(textResponse);
      })
      .catch((error) => {
        setRegister('User Not Found');
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `User Not Found`,
        });
      });
  };

  const closeWarningMessage = () => {
    setWarningMessage({
      warningMessageOpen: false,
      warningMessageText: '',
    });
  };

  return (
    <main id="mainContent" className="container">
      <div className="row justify-content-center py-5">
        <h3>Admin - User List</h3>
      </div>
      <div className="row">
        <div className="col-12 p-0">
          <Form Login={handleLogin} />
        </div>
        <h3>{isRegister}</h3>
        <WarningMessage
          open={warningMessage.warningMessageOpen}
          text={warningMessage.warningMessageText}
          onWarningClose={closeWarningMessage}
        />
      </div>
    </main>
  );
};

export default Login;
