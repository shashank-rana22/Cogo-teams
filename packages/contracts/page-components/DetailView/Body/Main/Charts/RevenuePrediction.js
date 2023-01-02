import Line from '../../../../../common/Line';
import Margin from '../../../../../common/MiniCard/Margin';
import Price from '../../../../../common/MiniCard/Price';

import styles from './styles.module.css';

function RevenuePrediction() {
	return (
		<div className={styles.mini_container}>
			<Margin />
			<Line />
			<Price />
			<Line />
		</div>
	);
}

export default RevenuePrediction;
