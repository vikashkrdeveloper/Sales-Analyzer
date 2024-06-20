# Sales Analyzer

Sales Analyzer is a comprehensive web application that provides insights into product sales transactions. It leverages the MERN Stack (MongoDB, Express.js, React, Node.js) to deliver robust and user-friendly functionality for analyzing sales data. This application is designed to help businesses make informed decisions by offering detailed statistics, searchable transaction records, and visual data representations.

## Features

- **Database Initialization**: Fetch and initialize the database with product transaction data from a third-party API.
- **Searchable Transactions**: View and search product transactions by title, description, or price.
- **Pagination**: Efficiently navigate through large sets of transaction records with pagination.
- **Monthly Statistics**: Generate key statistics for any selected month, including total sales, number of sold items, and number of unsold items.
- **Bar Chart Data**: Visualize the distribution of product prices in different ranges for a selected month.

## Installation and Setup

### Backend

1. **Clone the Repository**
    ```sh
    git clone https://github.com/vikashkrdeveloper/sales-analyzer.git
    ```

2. **Navigate to the Project Directory**
    ```sh
    cd sales-analyzer/server
    ```

3. **Install Dependencies**
    ```sh
    npm install
    ```

4. **Set Environment Variables**
    Create a `.env` file in the `backend` directory with the following content:
    ```env
    DATABASE_URL=your_mongodb_connection_string
    PORT=5000
    ```

5. **Start the Backend Server**
    ```sh
    npm start
    ```

### Frontend

1. **Navigate to the Frontend Directory**
    ```sh
    cd ../client
    ```

2. **Install Dependencies**
    ```sh
    npm install
    ```

3. **Start the Frontend Development Server**
    ```sh
    npm run dev
    ```

## Usage

- Access the application at `http://localhost:3000` in your web browser.
- Use the various endpoints to interact with the application and retrieve sales data.

## API Endpoints

### Initialize Database

Fetch and initialize the database with seed data from a third-party API.

- **Endpoint**: `GET /api/v1`

### Get Transactions

Retrieve product transactions with optional search and pagination.

- **Endpoint**: `GET /api/v1/all-transactions`
- **Query Parameters**:
  - `page`: Page number (default is 1)
  - `month`: Month number (default is 1)
  - `perPage`: Number of items per page (default is 10)
 
- **Endpoint**: `GET /api/v1/transactions/search`
- **Query Parameters**:
  - `month`: Month number (default is 1)
  - `search`: Search text to filter transactions by title, description, or price

### Get Statistics

Generate key statistics for a given month.

- **Endpoint**: `GET /api/v1/one-month-sale-report`
- **Query Parameters**:
  - `month`: The month for which to generate statistics (values: January - December)

### Get Bar Chart Data

Generate bar chart data representing the number of items in different price ranges for a given month.

- **Endpoint**: `GET /api/v1/bar-chart`
- **Query Parameters**:
  - `month`: The month for which to generate bar chart data (values: January - December)

### Get Pie Chart Data

Generate pie chart data representing the number of items in different categories for a given month.

- **Endpoint**: `GET /api/v1/pie-chart`
- **Query Parameters**:
  - `month`: The month for which to generate pie chart data (values: January - December)

### Get Above All Three Api Data

Generate  

- **Endpoint**: `GET /api/v1/all-combine-api`
- **Query Parameters**:
  - `month`: The month for which to generate pie chart data (values: January - December)

## Technologies Used

- **MongoDB**: NoSQL database for storing transaction data.
- **Express.js**: Web application framework for Node.js.
- **React**: JavaScript library for building user interfaces.
- **Node.js**: JavaScript runtime for server-side programming.
- **APEXCHARTS**: React package for giving a chart component.
- **NextUI**: NextUi package for giving a frontend component.


## License

This project is licensed under the MIT License.

---

For further information or assistance, please get in touch with the developer at [vikashjjp728@gmail.com].
