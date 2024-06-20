import { oneMonthSalesDetailsCombine } from "./one-month-sales-details.js";
import { barChartApiCombine } from "./bar-chart-api.js";
import { pieChartCombine } from "./pie-chart.js";

export const combineApiData = async (req, res) => {
    const month = req.query.month ? parseInt(req.query.month) : 1;
    res.status(200).json({
        message: "All APIs are combined",
        data: {
            oneMonthSalesDetails: await oneMonthSalesDetailsCombine(month),
            barChartApi: await barChartApiCombine(month),
            pieChart: await pieChartCombine(month)
        }
    });
}