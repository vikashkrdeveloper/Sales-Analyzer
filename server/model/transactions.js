import { database } from '../config/db.js';

const transactionsSchema = new database.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    category: {
        type: String,
        require: true,
        lowercase: true,
        trim: true
    },
    image: {
        type: String,
        require: true,
        lowercase: true,
        trim: true
    },
    sold: {
        type: Boolean,
        default: false,
    },
    dateOfSale: {
        type: Date,
        require: true,
    }
});

export const transactionsModel = database.model("transactions", transactionsSchema)