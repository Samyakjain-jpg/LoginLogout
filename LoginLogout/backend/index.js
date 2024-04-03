const express = require("express")
const app = express()
const dotenv = require('dotenv')
const cors = require('cors');
const PORT = process.env.PORT || 8000;
require("./db/config")

const corsOptions = {
    origin: 'http://localhost:3000', // Explicitly allow this origin
    credentials: true, // Allow credentials (cookies, authentication)
  };

app.use(express.urlencoded({ extended:false }))

app.use(cors(corsOptions));
//cross-origin-resource-platfroms basically used to backend and frontend server port are diff then they occor the err to handle this arr to used a cors

dotenv.config();
app.use(express.json()); // to accept json data

app.get('/', (req, res) => {
   res.status(200).json("server created")
});

app.use('/', require('./routes/router'))

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
