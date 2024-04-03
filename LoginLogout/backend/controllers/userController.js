const User = require("../models/user.js");
const {hashPasswordd, comparePassword} = require("../utils/auth.js")
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ error: "email is taken already" });
    }
    
    const hashPassword = await hashPasswordd(password);
    const user = await User.create({ name, email, password: hashPassword});
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      // Check user exists
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "No user found" });
      }
  
      // If passwords match
      const match = await comparePassword(password, user.password);
      if (match) {
        const token = jwt.sign({ 
          email: user.email, 
          id: user._id, 
          name: user.name
        }, process.env.JWT_SECRET);
        
        // Assuming you want to send the token as a cookie and the user as JSON
        res.cookie('token', token, { httpOnly: true }); // Add secure: true in production!
        return res.json(user);
      } else {
        // If passwords do not match
        return res.status(401).json({
          error: 'Password does not match'
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred during login.' });
    }
  };
  

module.exports = { registerUser, loginUser };





