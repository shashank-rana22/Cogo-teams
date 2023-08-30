import Price from './Price';
import Route from './Route';
import styles from './styles.module.css';

function Body({
	rate = {},
	detail = {},
	// infoBanner = {},
	// showGuide = false,
	isSelectedCard = false,
}) {
	return (
		<div className={styles.container}>
			<Route detail={detail} rate={rate} />

			<Price
				detail={detail}
				rate={rate}
				isSelectedCard={isSelectedCard}
			/>
		</div>
	);
}

export default Body;
