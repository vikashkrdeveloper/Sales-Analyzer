import { transactionsModel } from "../model/transactions.js";

export const oneMonthSalesDetails = async (req, res) => {
    try {
        const month = req.query.month ? parseInt(req.query.month) : 1;
        const transactions = await transactionsModel.find();

        let totalSale = 0;
        let totalSoldItems = 0;
        let totalNotSoldItems = 0;
        transactions.filter(transaction => {
            const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1;
            if (transactionMonth === month) {
                if (transaction.sold === true) {
                    totalSoldItems += 1;
                } else {
                    totalNotSoldItems += 1;
                }
                totalSale += transaction.price;
                return true;
            }
            return false;
        });
        const result = {
            totalSale,
            totalSoldItems,
            totalNotSoldItems,
        };
        res.status(200).json(result);
        return;
    }
    catch (error) {
        res.status(404).json({ message: "Some technical issue" });
        return;
    }
}


export const oneMonthSalesDetailsCombine = async (month) => {
    try {
        const transactions = await transactionsModel.find();
        let totalSale = 0;
        let totalSoldItems = 0;
        let totalNotSoldItems = 0;
        transactions.filter(transaction => {
            const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1;
            if (transactionMonth === month) {
                if (transaction.sold === true) {
                    totalSoldItems += 1;
                } else {
                    totalNotSoldItems += 1;
                }
                totalSale += transaction.price;
                return true;
            }
            return false;
        });
        const result = {
            totalSale,
            totalSoldItems,
            totalNotSoldItems,
        };
        return result;
    }
    catch (error) {
        return { message: "Some technical issue" };
    }
}