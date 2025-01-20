const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
    ]);
});

app.post('/api/users', (req, res) => {
    const user = req.body;
    setTimeout(() => {
      res.status(201).send({ message: 'User created successfully', user });
    }, 1000);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});