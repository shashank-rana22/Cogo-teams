import Price from './Price';
import Route from './Route';
import styles from './styles.module.css';

function Body({
	rate = {},
	detail = {},
	// infoBanner = {},
	// showGuide = false,
	isCogoAssured = false,
	isSelectedCard = false,
}) {
	return (
		<div className={styles.container}>
			<Route detail={detail} isCogoAssured={isCogoAssured} rate={rate} />

			<Price
				detail={detail}
				rate={rate}
				isSelectedCard={isSelectedCard}
				isCogoAssured={isCogoAssured}
			/>
		</div>
	);
}

export default Body;
