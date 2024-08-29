import axios from "../axios.js";
export class MenuService {
  async getItems() {
    try {
      const items = await axios.get("/menu/get-menu-items");
      return items.data.data;
    } catch (error) {
      throw error;
    }
  }
  async updateMenu(data) {
    try {
      const response = await axios.post("/menu/add-menu", { data });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async deleteMenu(data) {
    try {
      const response = await axios.delete("/menu/delete-menu", { data });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

const menuService = new MenuService();
export default menuService;
