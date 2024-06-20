import { transactionsModel } from "../model/transactions.js";

export const pieChart = async (req, res) => {
    try {
        const month = req.query.month ? parseInt(req.query.month) : 1;
        const transactions = await transactionsModel.find({
            $expr: {
                $and: [
                    { $gte: [{ $month: "$dateOfSale" }, month] },
                    { $lt: [{ $month: "$dateOfSale" }, month + 1] }
                ]
            }
        });
        const transactionStatus = transactions.reduce((acc, transaction) => {
            const itemName = transaction.title;
            if (acc[itemName]) {
                acc[itemName]++;
            } else {
                acc[itemName] = 1;
            }
            return acc;
        }, {});
        const responseData = Object.entries(transactionStatus).map(([itemName, itemCount]) => ({
            itemName,
            itemCount
        }));
        res.status(200).json(responseData);
        return;
    } catch (error) {
        res.status(500).json({ message: "Some technical issue" });
        return;
    }
}


export const pieChartCombine = async (month) => {
    try {
        const transactions = await transactionsModel.find({
            $expr: {
                $and: [
                    { $gte: [{ $month: "$dateOfSale" }, month] },
                    { $lt: [{ $month: "$dateOfSale" }, month + 1] }
                ]
            }
        });
        const transactionStatus = transactions.reduce((acc, transaction) => {
            const itemName = transaction.title;
            if (acc[itemName]) {
                acc[itemName]++;
            } else {
                acc[itemName] = 1;
            }
            return acc;
        }, {});
        const responseData = Object.entries(transactionStatus).map(([itemName, itemCount]) => ({
            itemName,
            itemCount
        }));
        return responseData;
    } catch (error) {
        return { message: "Some technical issue" };
    }
}