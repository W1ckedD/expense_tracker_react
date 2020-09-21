const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (event, data) => {
    try {
        const { username, password, initialBalance } = data;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            username,
            password: hashedPassword,
            balance: parseFloat(initialBalance),
        });
        event.reply('user-registered', { user: JSON.stringify(user) });
    } catch (err) {
        if (err.code === 11000) {
            event.reply('error', 'This username is already taken');
            return;
        }
        console.log(err);
        event.reply('error', 'Something went wrong');
    }
};

exports.login = async (event, data) => {
    try {
        const { username, password } = data;
        const user = await User.findOne({ username });
        if (!user) {
            event.reply('error', 'Invalid credentials');
            return;
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            event.reply('error', 'Invalid credentials');
            return;
        }

        event.reply('user-logged-in', { user: JSON.stringify(user) });
    } catch (err) {
        console.log(err);
        event.reply('error', 'Something went wrong');
        return;
    }
};

exports.getUser = async (event, data) => {
    try {
        const { userId } = data;
        const user = await User.findById(userId);
        event.reply('user-sent', { user: JSON.stringify(user) });
    } catch (err) {
        console.log(err);
        event.reply('error', 'Something went wrong');
        return;
    }
};