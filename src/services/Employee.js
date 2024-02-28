import axios from "axios";

class EmployeeService {
    signup(user) {
        return axios.post("http://localhost:8080/api/v1/employees", user);
    }

    authenticate(user) {
        return axios.post("http://localhost:8080/api/v1/login", user);
    }

    update(user) {
        return axios.put(`http://localhost:8080/api/v1/employees/${user.id}`, user)
    }

    findEmployeeByUsername(username) {
        return axios.post(`http://localhost:8080/api/v1/findUsername`, username);
    }
}
export default new EmployeeService();