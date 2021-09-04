import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [],
		totalQuantity: 0
	},
	reducers: {
		replaceCartItems(state, action) {
			state.totalQuantity = action.payload.totalQuantity;
			state.items = action.payload.items;
		},
		addItemToCart(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			state.totalQuantity++;
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
				existingItem.totalPrice = existingItem.totalPrice + newItem.price;
			}
		},
		removeItemFromCart(state, action) {
			if (state.totalQuantity > 0) {
				const id = action.payload;
				const existingItem = state.items.find((item) => item.id === id);
				state.totalQuantity--;
				if (existingItem.quantity === 1) {
					state.items = state.items.filter((item) => item.id !== existingItem.id);
				} else {
					existingItem.quantity--;
					existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
				}
			}
		}
	}
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
