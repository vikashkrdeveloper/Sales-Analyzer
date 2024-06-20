import { transactionsModel } from "../model/transactions.js";

export const allTransaction = async (req, res) => {
    try {
        const month = parseInt(req.query.month);
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const startIndex = (page - 1) * limit;
        if (month === -1) {
            const transactions = await transactionsModel.find().skip(startIndex).limit(limit);
            const totalData = await transactionsModel.countDocuments();
            const pagination = {
                currentPage: page,
                totalPages: Math.ceil(totalData / limit),
                totalItems: totalData
            };
            res.status(200).json({ transactions, pagination });
            return;
        } else {
            const transactions = await transactionsModel.find({
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, month]
                }
            }).skip(startIndex).limit(limit);
            const pagination = {
                currentPage: page,
                totalPages: Math.ceil(transactions.length / limit),
                totalItems: transactions.length
            };
            res.status(200).json({ transactions, pagination });
            return;
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
        return;
    }
}

