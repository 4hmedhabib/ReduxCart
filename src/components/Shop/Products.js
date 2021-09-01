import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_ITEMS = [
	{
		id: 'p1',
		title: 'My First Book',
		price: 6,
		description: 'This Is My First Book Ever Wrote!'
	},
	{
		id: 'p2',
		title: 'My Second Book',
		price: 5,
		description: 'This Is My Second Book Ever Wrote!'
	}
];

const Products = (props) => {
	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>
				{DUMMY_ITEMS.map((item) => (
					<ProductItem
						key={item.id}
						id={item.id}
						title={item.title}
						price={item.price}
						description={item.description}
					/>
				))}
			</ul>
		</section>
	);
};

export default Products;
