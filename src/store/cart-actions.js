import { uiActions } from './ui-slice';

export const requestCartData = () => {
	return async (dispatch) => {
		const sendRequest = async () => {
			const response = await fetch('https://react-http-992d0-default-rtdb.firebaseio.com/cart.json', {
				method: 'GET'
			});
		};
	};
};

export const sendCartData = (cart) => {
	return async (dispatch) => {
		dispatch(
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
			dispatch(
				uiActions.showNotification({
					status: 'success',
					title: 'Success!',
					message: 'Sent Cart Data Successfully!'
				})
			);
		} catch (err) {
			dispatch(
				uiActions.showNotification({
					status: 'error',
					title: 'Error!',
					message: 'Sent Cart Data failed!'
				})
			);
		}
	};
};
