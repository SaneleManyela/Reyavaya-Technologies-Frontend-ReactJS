import axios from "axios";

class SupplierService {
    getSupplier() {
        return axios.get(`http://localhost:8080/api/v1/suppliers`);
    }

    createSupplier(supplier) {
        return axios.post(`http://localhost:8080/api/v1/suppliers`, supplier);
    }

    async getName(id) {
        const res = await axios.get(`http://localhost:8080/api/v1/suppliers/${id}`);
        return res.data.name;
    } 

    getById(id) {
        return axios.get(`http://localhost:8080/api/v1/suppliers/${id}`);
    }

    updateSupplier(supplier) {
        return axios.put(`http://localhost:8080/api/v1/suppliers/${supplier.id}`, supplier);
    }

    deleteSupplier(supplier) {
        return axios.delete(`http://localhost:8080/api/v1/suppliers/${supplier}`);
    }
}
export default new SupplierService();
