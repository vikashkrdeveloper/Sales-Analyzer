import express from 'express';
import { allTransaction } from '../controllers/all-transaction.js';
import { searchTransaction } from '../controllers/search-transaction.js';
import { oneMonthSalesDetails } from '../controllers/one-month-sales-details.js';
import { barChartApi } from '../controllers/bar-chart-api.js';
import { pieChart } from '../controllers/pie-chart.js';
import { combineApiData } from '../controllers/combine-api-data.js';

export const route = express.Router();

route.get('/all-transactions', allTransaction);
route.get('/transactions/search', searchTransaction);
route.get('/one-month-sale-report', oneMonthSalesDetails);
route.get('/bar-chart', barChartApi);
route.get('/pie-chart', pieChart);
route.get('/all-combine-api', combineApiData);