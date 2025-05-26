const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { users } = require('../models/userModel');
const { secretKey } = require('../config/secrets');

const authController = {

    async login(req, res) {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username);
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ userId: user.username }, secretKey, { expiresIn: '1h' });
        req.session.user = username; 
        res.status(200).send({ token });
    },

    async signUp(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).send({ error: 'Username and password are required' });
            }

            users.push({ username, password: await bcrypt.hash(password, 10) });

            res.status(201).send({ message: 'User signed up successfully' });
        } catch (error) {
            res.status(500).send({ error: 'Internal server error' });
        }
    },

    // for logout
    async logout(req, res) {
        req.session.destroy(err => {
            if (err) return res.status(500).send('Error logging out');
            res.send('User logged out successfully!');
        });
    }
}


module.exports = authController;
