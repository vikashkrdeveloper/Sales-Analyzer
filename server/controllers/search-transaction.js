import { transactionsModel } from "../model/transactions.js";

export const searchTransaction = async (req, res) => {
    try {
        const { search } = req.query;
        const month = req.query.month ? parseInt(req.query.month) : 1;
        const transactions = await transactionsModel.find({
            $expr: {
                $and: [
                    { $gte: [{ $month: "$dateOfSale" }, month] },
                    { $lt: [{ $month: "$dateOfSale" }, month + 1] }
                ]
            }
        }).limit(10);
        if (!search) {
            res.status(200).json(transactions);
            return;
        }
        const filteredTransactions = transactions.filter(transaction => {
            const titleMatch = transaction.title.toLowerCase().includes(search.toLowerCase());
            const descriptionMatch = transaction.description.toLowerCase().includes(search.toLowerCase());
            const priceMatch = transaction.price.toString().includes(search);
            return titleMatch || descriptionMatch || priceMatch;
        });
        const result = {
            transactions: filteredTransactions,
            pagination: {
                currentPage: 1,
                totalPages: Math.ceil(filteredTransactions.length / 10),
                totalItems: filteredTransactions.length
            }
        }
        res.status(200).json(result);
        return;
    }
    catch (error) {
        res.status(404).json({ message: error.message });
        return;
    }
}
