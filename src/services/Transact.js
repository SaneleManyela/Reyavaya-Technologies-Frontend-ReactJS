import axios from "axios";

class TransactService {
    createSale(sale) {
        return axios.post("http://localhost:8080/api/v1/sales", sale);
    }

    createTransaction(transaction) {
        return axios.post("http://localhost:8080/api/v1/transaction", transaction);
    }

    getAllSales() {
        return axios.get("http://localhost:8080/api/v1/sales")
    }

    getAllTransactions() {
        return axios.get("http://localhost:8080/api/v1/transactions")
    }
}
export default new TransactService();