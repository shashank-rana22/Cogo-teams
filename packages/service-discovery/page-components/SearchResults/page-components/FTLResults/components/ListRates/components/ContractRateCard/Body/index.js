import Price from '../../RateCard/Body/Price';
import Route from '../../RateCard/Body/Route';

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
				isContract={rate?.source === 'contract'}
			/>
		</div>
	);
}

export default Body;
