import Line from '../../../../../common/Line';
import Margin from '../../../../../common/MiniCard/Margin';
import useFclFreightRateForecasting from '../../../../../hooks/useFclFreightRateForecasting';

import Frequency from './Frequency';
import styles from './styles.module.css';

function ProfitabilityPrediction({ activePair, statsDataRevenue }) {
	const { data } = useFclFreightRateForecasting({ data: activePair });
	let avgPrice = 0;
	if ((data || []).length) {
		(data || []).forEach((rate) => {
			avgPrice += rate;
		});
		avgPrice /= 30;
	}

	return (
		<div className={styles.chart}>
			<div className={styles.head_profit}>
				<Margin
					heading="Avg. Buy Price in the last 30 Days"
					value={statsDataRevenue?.avg_buy_price_in_last_30_days.toFixed(2)}
				/>
				<Line />
				<Margin
					heading="Avg. Sell Price in the last 30 Days"
					value={statsDataRevenue?.avg_buy_price_in_last_30_days.toFixed(2)}
				/>
				<Line />
				<Margin heading="Avg. Buy Price in the next 30 Days" value={Math.round(avgPrice)} />
			</div>
			<div className={styles.stats}>
				<div className={styles.graph_heading}>
					Predicted Avg. Price Data for the next 30 Days
				</div>
				{activePair?.service_type === 'fcl_freight'
					? 					<Frequency data={data} avgPrice={avgPrice} /> : null}
			</div>
		</div>
	);
}

export default ProfitabilityPrediction;
