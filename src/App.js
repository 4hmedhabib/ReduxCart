import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
let isInitial = true;
function App() {
	const cartShow = useSelector((state) => state.ui.cartIsVisible);
	const notification = useSelector((state) => state.ui.notification);
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	useEffect(
		() => {
			const sendCartData = async () => {
				dispatch(
					uiActions.showNotification({
						status: 'pending',
						title: 'Pendin...',
						message: 'Sending Cart Data'
					})
				);
				const response = await fetch('https://react-http-992d0-default-rtdb.firebaseio.com/cart.json', {
					method: 'PUT',
					body: JSON.stringify(cart)
				});

				if (!response.ok) {
					throw Error('Sending cart data failed!');
				}

				dispatch(
					uiActions.showNotification({
						status: 'success',
						title: 'Success!',
						message: 'Sent Cart Data Successfully!'
					})
				);
			};

			if (isInitial) {
				isInitial = false;
				return;
			}

			sendCartData().catch((err) => {
				dispatch(
					uiActions.showNotification({
						status: 'error',
						title: 'Error!',
						message: 'Sent Cart Data failed!'
					})
				);
			});
		},
		[ cart, dispatch ]
	);

	return (
		<Fragment>
			{notification && (
				<Notification status={notification.status} title={notification.title} message={notification.message} />
			)}
			<Layout>
				{cartShow && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
