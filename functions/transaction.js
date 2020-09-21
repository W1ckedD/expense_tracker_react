const Transaction = require('../models/Transaction');
const User = require('../models/User');

exports.getUserTransactions = async (event, data) => {
    try {
        const { userId } = data;
        const transactions = await Transaction.find({ userId }).sort({
            date: 'desc',
        });
        event.reply('user-transactions-sent', {
            transactions: JSON.stringify(transactions),
        });
    } catch (err) {
        console.log(err);
        event.reply('error', 'Something went wrong');
    }
};

exports.addTransaction = async (event, data) => {
    try {
        const transaction = JSON.parse(data.transaction);
        const user = await User.findById(transaction.userId);
        if (transaction.type === 'income') {
            user.balance += transaction.amount;
        } else {
            user.balance -= transaction.amount;
        }
        await user.save();
        const tsx = await Transaction.create(transaction);
        event.reply('transaction-added', { transaction: JSON.stringify(tsx) });
    } catch (err) {
        console.log(err);
        event.reply('error', 'Something went wrong');
    }
};

exports.getUserTransactionsByDate = async (event, data) => {
    try {
        const { userId, startDate, endDate } = data;
        const transactions = await Transaction.find({
            userId,
            date: { $gte: new Date(startDate), $lte: new Date(endDate) },
        });
        event.reply('user-transactions-sent', {
            transactions: JSON.stringify(transactions),
        });
    } catch (err) {
        console.log(err);
        event.reply('error', 'Something went wrong');
    }
};

exports.transactionAdvancedSearch = async (event, data) => {
    try {
        const { userId, startDate, endDate, title, type } = data;
        const options = { userId };
        if (type) {
            options['type'] = type;
        }
        if (startDate && endDate) {
            options['date'] = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        } else if (startDate && !endDate) {
            options['date'] = { $gte: new Date(startDate) };
        } else if (!startDate && endDate) {
            options['date'] = { $lte: new Date(endDate) };
        }
        if (title) {
            options['title'] = { $regex: title, $options: 'i' };
        }
        const transactions = await Transaction.find(options).sort({
            date: 'desc',
        });
        event.reply('user-transactions-sent', {
            transactions: JSON.stringify(transactions),
        });
    } catch (err) {
        console.log(err);
        event.reply('error', 'Something went wrong');
    }
};

exports.deleteTransaction = async (event, data) => {
    try {
        const { userId, transactionId } = data;
        const user = await User.findById(userId);
        const transaction = await Transaction.findOne({
            userId,
            _id: transactionId,
        });
        if (transaction.type === 'income') {
            user.balance -= transaction.amount;
        } else {
            user.balance += transaction.amount;
        }
        await user.save();
        await transaction.deleteOne();
        const transactions = await Transaction.find({ userId }).sort({
            date: 'desc',
        });
        event.reply('user-transactions-sent', {
            transactions: JSON.stringify(transactions),
        });
    } catch (err) {
        console.log(err);
        event.reply('error', 'Something went wrong');
    }
};