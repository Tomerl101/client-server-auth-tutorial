const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

//parse json coming from client request
app.use(express.json());

//save all the register users
const users = [];

app.get('/', (req, res) => {
  res.json('This is Server on port 4000!');
});
//get all users
app.get('/users', (req, res) => {
  res.json(users);
});

//register new user
//example for body : {"name": "tomer", "password":"123456!"}
app.post('/users/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    //add new user to the user array
    users.push(user);
    res.status(201).send(); // OK
  } catch {
    res.status(500).send(); // FAIL
  }
});

app.post('/users/login', async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success');
    } else {
      res.send('Not Allowed');
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(4000, () => console.log('Server run on port 4000'));
