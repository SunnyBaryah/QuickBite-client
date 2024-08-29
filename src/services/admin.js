import axios from "../axios.js";
export class AdminService {
  async login({ email, password }) {
    try {
      let response = await axios.post("/admin/login", {
        email,
        password,
      });
      if (response.status === 200) {
        return response;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      let response = await axios.post("/admin/logout");
      if (response.status === 200) {
        return response;
      } else {
        console.log("Error while logging out");
      }
    } catch (error) {
      throw error;
    }
  }
  async getCurrentAdmin() {
    try {
      let response = await axios.get("/admin/get-admin");
      if (response.status === 200) {
        return response;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
const adminService = new AdminService();
export default adminService;
