import axios from 'axios';

class StockService {
    createStock(stock) {
        return axios.post(`http://localhost:8080/api/v1/stock`, stock);
    }

    getAllStock() {
        return axios.get(`http://localhost:8080/api/v1/stock`);
    }

    getStockById(id) {
        return axios.get(`http://localhost:8080/api/v1/stock/${id}`);
    }

    updateStock(stock) {
        return axios.put(`http://localhost:8080/api/v1/stock/${stock.id}`, stock);
    }
}

export default new StockService();