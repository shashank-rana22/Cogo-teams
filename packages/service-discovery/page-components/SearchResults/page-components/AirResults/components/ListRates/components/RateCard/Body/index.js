import Price from './Price';
import Route from './Route';
import styles from './styles.module.css';

function Body({
	rate = {},
	detail = {},
	isSelectedCard = false,
	setRouterLoading = () => {},
}) {
	return (
		<div className={styles.container}>
			<Route detail={detail} rate={rate} />

			<Price
				detail={detail}
				rate={rate}
				isSelectedCard={isSelectedCard}
				setRouterLoading={setRouterLoading}
			/>
		</div>
	);
}

export default Body;
