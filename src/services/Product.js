import axios from "axios";

class ProductService {
    createProduct(product) {
        return axios.post("http://localhost:8080/api/v1/products", product);
    }

   getAllProducts() {
        return axios.get(`http://localhost:8080/api/v1/products`);
   } 

   getById(product) {
        return axios.get(`http://localhost:8080/api/v1/products/${product}`);
   }
   
   updateProduct(product) {
        return axios.put(`http://localhost:8080/api/v1/products/${product.id}`, product);
   }

   deleteProduct(product) {
        return axios.delete(`http://localhost:8080/api/v1/products/${product}`);
   }
}
export default new ProductService();