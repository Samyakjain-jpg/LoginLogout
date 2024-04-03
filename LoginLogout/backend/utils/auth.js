const bcrypt = require('bcrypt');

const hashPasswordd = async (password) => {
    try {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);
        return hash; // Successfully hashed password
    } catch (err) {
        throw err; // Properly handle error
    }
};

const comparePassword = async (password, hashed) => {
    try {
        return await bcrypt.compare(password, hashed); // true if match, false otherwise
    } catch (err) {
        throw err; // Properly handle error
    }
};

module.exports = { hashPasswordd, comparePassword };
