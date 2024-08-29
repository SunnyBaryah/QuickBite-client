import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderData: [],
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setItems: (state, action) => {
      action.payload.map((item) => {
        state.orderData.push({ ...item, quantity: 0 });
      });
    },
    clearItems: (state, action) => {
      state.orderData.map((item) => {
        item.quantity = 0;
      });
    },
    setItemQty: (state, action) => {
      state.orderData.map((orderItem) => {
        if (orderItem._id === action.payload.id) {
          orderItem.quantity = action.payload.quantity;
        }
      });
    },
  },
});

export const { setItems, setItemQty, clearItems } = orderSlice.actions;
export default orderSlice.reducer;
