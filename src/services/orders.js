import axios from "../axios.js";

export class OrderService {
  async saveOrder({ order }) {
    try {
      const response = await axios.post("/orders/save-order", { order });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  async getOrder() {
    try {
      const response = await axios.get("/orders/get-order");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllOrders() {
    try {
      const response = await axios.get("/admin/get-all-orders");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(order) {
    try {
      console.log(order);
      const response = await axios.put("/orders/update-order", { order });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

const orderService = new OrderService();
export default orderService;
