import axios from "axios";

class BrandService {
    createBrand(brand) {
        return axios.post("http://localhost:8080/api/v1/brand", brand);
    }

    getAllBrands() {
        return axios.get("http://localhost:8080/api/v1/brands");
    }

    getById(brand) {
        return axios.get(`http://localhost:8080/api/v1/brand/${brand}`);
    }

    findBrandByName(name) {
        return axios.post(`http://localhost:8080/api/v1/findBrand`, name)
    }

    updateBrand(brand) {
        return axios.put(`http://localhost:8080/api/v1/brand/${brand.id}`, brand);
    }
}
export default new BrandService();