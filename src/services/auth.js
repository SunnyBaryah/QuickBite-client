import axios from "../axios.js";
import { toast } from "react-toastify";
export class AuthService {
  async createAccount({ username, email, password }) {
    try {
      let response = await axios.post("/users/register", {
        username,
        email,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        toast.success("Account created successfully", {
          position: "bottom-right",
        });
        return this.login({ email, password });
      } else return null;
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      let response = await axios.post("/users/login", {
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
  async getCurrentUser() {
    try {
      let response = await axios.get("/users/get-current-user");
      if (response.status === 200) {
        return response;
      } else return null;
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      let response = await axios.post("/users/logout");
      if (response.status === 200) {
        return response;
      } else {
        console.log("Error while logging out");
      }
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
