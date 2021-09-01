import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
		totalQuantity: 0
	},
	reducers: {
		addItemToCart(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					name: newItem.title,
					quantity: newItem.quantity,
					price: newItem.price,
					totalPrice: newItem.price
				});
			} else {
				existingItem.quantity++;
				existingItem.totalPrice = existingItem.price + newItem.price;
			}
		}
	}
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
