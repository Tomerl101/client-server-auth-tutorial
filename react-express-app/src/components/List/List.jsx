import React, { useState } from 'react';
import ListItem from './ListItem';
import Form from './Form';
import WarningMessage from '../WarningMessage';
import CONSTANTS from '../../constants';

const List = () => {
  const [items, setItems] = useState([]);
  const [warningMessage, setWarningMessage] = useState({ warningMessageOpen: false, warningMessageText: '' });

  //get all register users from the server - localhost:4000/users [GET]
  const getItems = () => {
    let promiseList = fetch('http://localhost:4000/users').then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    });
    return promiseList;
  };

  const addItem = (user) => {
    // Warning Pop Up if the user submits an empty message
    if (!user) {
      setWarningMessage({
        warningMessageOpen: true,
        warningMessageText: CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE,
      });
      return;
    }

    console.log(user);
    fetch('http://localhost:4000/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((itemAdded) => {
        console.log(itemAdded);
        setItems([itemAdded, ...items]);
      })
      .catch((error) =>
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_ADD} ${error}`,
        })
      );
  };

  const closeWarningMessage = () => {
    setWarningMessage({
      warningMessageOpen: false,
      warningMessageText: '',
    });
  };

  React.useEffect(() => {
    getItems()
      .then((list) => {
        console.log(list);
        setItems(list);
      })
      .catch((error) =>
        setWarningMessage({
          warningMessageOpen: true,
          warningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_GET} ${error}`,
        })
      );
  }, []);

  return (
    <main id="mainContent" className="container">
      <div className="row justify-content-center py-5">
        <h3>Admin - User List</h3>
      </div>
      <div className="row">
        <div className="col-12 p-0">
          <Form addItem={addItem} />
        </div>

        {items.map((listItem, index) => (
          <ListItem key={index} item={listItem} />
        ))}

        <WarningMessage
          open={warningMessage.warningMessageOpen}
          text={warningMessage.warningMessageText}
          onWarningClose={closeWarningMessage}
        />
      </div>
    </main>
  );
};

export default List;
