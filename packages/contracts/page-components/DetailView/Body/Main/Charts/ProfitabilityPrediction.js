import Line from '../../../../../common/Line';
import Margin from '../../../../../common/MiniCard/Margin';
import Percentage from '../../../../../common/MiniCard/Percentage';
import Price from '../../../../../common/MiniCard/Price';

import styles from './styles.module.css';

function ProfitabilityPrediction() {
	return (
		<div className={styles.chart}>
			<div className={styles.head_profit}>
				<Price />
				<Line />
				<Margin />
				<Line />
				<Percentage />
			</div>
		</div>
	);
}

export default ProfitabilityPrediction;
