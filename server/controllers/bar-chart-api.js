import { transactionsModel } from "../model/transactions.js";

export const barChartApi = async (req, res) => {
    try {
        const month = req.query.month ? parseInt(req.query.month) : 1;
        const transactions = await transactionsModel.find({
            $expr: {
                $and: [
                    { $gte: [{ $month: "$dateOfSale" }, month - 1] },
                    { $lt: [{ $month: "$dateOfSale" }, month + 1] }
                ]
            }
        });
        const priceRanges = [
            { min: 0, max: 50 },
            { min: 51, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: 1000 },
            { min: 1000, max: 50000 },
        ];
        const rangeCounts = new Array(priceRanges.length).fill(0);
        transactions.forEach(transaction => {
            const price = parseFloat(transaction.price);
            for (let i = 0; i < priceRanges.length; i++) {
                if (price >= priceRanges[i].min && price <= priceRanges[i].max) {
                    rangeCounts[i]++;
                    break;
                }
            }
        });
        const monthSelection = ["Janauary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const responseData = {
            month: monthSelection[month - 1],
            data: priceRanges.map((range, index) => ({
                priceRange: `${range.min} - ${range.max}`,
                items: rangeCounts[index]
            }))
        };
        res.status(200).json(responseData);
        return;
    } catch (error) {
        res.status(500).json({ message: "Some technical issue" });
        return;
    }
}

export const barChartApiCombine = async (month) => {
    try {
        const transactions = await transactionsModel.find({
            $expr: {
                $and: [
                    { $gte: [{ $month: "$dateOfSale" }, month - 1] },
                    { $lt: [{ $month: "$dateOfSale" }, month + 1] }
                ]
            }
        });
        const priceRanges = [
            { min: 0, max: 50 },
            { min: 51, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: 1000 },
            { min: 1000, max: 50000 },
        ];
        const rangeCounts = new Array(priceRanges.length).fill(0);
        transactions.forEach(transaction => {
            const price = parseFloat(transaction.price);
            for (let i = 0; i < priceRanges.length; i++) {
                if (price >= priceRanges[i].min && price <= priceRanges[i].max) {
                    rangeCounts[i]++;
                    break;
                }
            }
        });
        const monthSelection = ["Janauary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const responseData = {
            month: monthSelection[month - 1],
            data: priceRanges.map((range, index) => ({
                priceRange: `${range.min} - ${range.max}`,
                items: rangeCounts[index]
            }))
        };
        return responseData;
    } catch (error) {
        return { message: "Some technical issue" };
    }
}