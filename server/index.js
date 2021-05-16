const express = require('express');
require('./db/mongoose');
const app = express();
const userRoutes = require('./routes/user');
const cors = require('cors');


app.use(cors())
app.use(express.json());
app.use(userRoutes);

const port = process.env.PORT || 8000;

app.get('/',(req,res) => {
    res.send({message: 'hello'})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})