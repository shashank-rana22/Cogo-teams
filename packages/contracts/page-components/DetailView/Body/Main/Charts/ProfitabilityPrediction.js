import Line from '../../../../../common/Line';
import Margin from '../../../../../common/MiniCard/Margin';
import useFclFreightRateForecasting from '../../../../../hooks/useFclFreightRateForecasting';

import FutureFrequency from './FrequencyFuture';
// import PastFrequecy from './FrequencyPast';
import styles from './styles.module.css';

function ProfitabilityPrediction({ activePair, statsDataRevenue }) {
	const { data } = useFclFreightRateForecasting({
		data: {
			origin_port_id      : activePair?.origin_port_id,
			destination_port_id : activePair?.destination_port_id,
			shipping_line_id    : activePair?.shipping_line_id,
			container_size      : activePair?.container_size,
			airline_id          : activePair?.airline_id,
		},
	});
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
					value={statsDataRevenue?.avg_buy_price?.toFixed(2)}
				/>
				<Line />
				<Margin
					heading="Avg. Sell Price in the last 30 Days"
					value={statsDataRevenue?.avg_sell_price?.toFixed(2)}
				/>
				<Line />
				<Margin heading="Avg. Buy Price in the next 30 Days" value={Math.round(avgPrice)} />
			</div>
			<div className={styles.stats}>
				<div className={styles.graph_heading}>
					Predicted Avg. Price Data for the next 30 Days
				</div>
				{activePair?.service_type === 'fcl_freight' && (data || []).length
					? <FutureFrequency data={data} avgPrice={avgPrice} /> : null}
				{/* <PastFrequecy statsDataRevenue={statsDataRevenue} /> */}
			</div>
		</div>
	);
}

export default ProfitabilityPrediction;
