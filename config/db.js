const mongoose = require('mongoose');
const MONGODB_CONN_STR = 'mongodb://localhost:27017/expense_tracker';

module.exports = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_CONN_STR, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}