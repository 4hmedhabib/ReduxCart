import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

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

export const sendCartData = (cart) => {
	return async (takeVersion) => {
		takeVersion(
			uiActions.showNotification({
				status: 'pending',
				title: 'Pendin...',
				message: 'Sending Cart Data'
			})
		);

		const sendRequest = async () => {
			const response = await fetch('https://react-http-992d0-default-rtdb.firebaseio.com/cart.json', {
				method: 'PUT',
				body: JSON.stringify(cart)
			});

			if (!response.ok) {
				throw Error('Sending cart data failed!');
			}
		};

		try {
			await sendRequest();
			takeVersion(
				uiActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Sent Cart Data Successfully!'
				})
			);
		} catch (err) {
			takeVersion(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Sent Cart Data failed!'
				})
			);
		}
	};
};

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
