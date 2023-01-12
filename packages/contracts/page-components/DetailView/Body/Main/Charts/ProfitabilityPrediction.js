import Line from '../../../../../common/Line';
import Margin from '../../../../../common/MiniCard/Margin';
import Percentage from '../../../../../common/MiniCard/Percentage';
import Price from '../../../../../common/MiniCard/Price';
import useFclFreightRateForecasting from '../../../../../hooks/useFclFreightRateForecasting';

import Frequency from './Frequency';
import styles from './styles.module.css';

function ProfitabilityPrediction({ activePair }) {
	const { data } = useFclFreightRateForecasting({ data: activePair });

	return (
		<div className={styles.chart}>
			<div className={styles.head_profit}>
				<Price />
				<Line />
				<Margin />
				<Line />
				<Percentage />
			</div>
			<div className={styles.stats}>
				<Frequency data={data} />
			</div>
		</div>
	);
}

export default ProfitabilityPrediction;
