import Line from '../../../../../common/Line';
import Margin from '../../../../../common/MiniCard/Margin';
import useFclFreightRateForecasting from '../../../../../hooks/useFclFreightRateForecasting';
import useGetShipmentsAvgPrice from '../../../../../hooks/useGetShipmentsAvgPrice';

import FutureFrequency from './FrequencyFuture';
import PastFrequecy from './FrequencyPast';
import styles from './styles.module.css';

function ProfitabilityPrediction({ activePair }) {
	const { data: forecastData } = useFclFreightRateForecasting({
		data: activePair,
	});

	const { data : avgPriceData } = useGetShipmentsAvgPrice({
		payload: activePair,
	});
	let avgPrice = 0;
	if ((forecastData || []).length) {
		(forecastData || []).forEach((rate) => {
			avgPrice += rate;
		});
		avgPrice /= 30;
	}

	return (
		<div className={styles.chart}>
			<div className={styles.head_profit}>
				<Margin
					heading="Avg. Buy Price in the last 30 Days"
					value={avgPriceData?.avg_buy_price?.toFixed(2)}
				/>
				<Line />
				<Margin
					heading="Avg. Sell Price in the last 30 Days"
					value={avgPriceData?.avg_sell_price?.toFixed(2)}
				/>
				<Line />
				{activePair?.service_type === 'fcl_freight' && (forecastData || []).length
					? <Margin heading="Avg. Buy Price in the next 30 Days" value={Math.round(avgPrice)} />
					: null}
			</div>
			<div className={styles.stats}>
				{activePair?.service_type === 'fcl_freight' && forecastData ? (
					<div className={styles.graph_heading}>
						Predicted Avg. Price Data for the next 30 Days
					</div>
				) : null}
				{activePair?.service_type === 'fcl_freight' && forecastData
					? <FutureFrequency data={forecastData} avgPrice={avgPrice} /> : null}

				<div className={styles.graph_heading}>
					Last 30 Days Buy Price vs. Sell Price
				</div>
				<PastFrequecy avgPriceData={avgPriceData} />
			</div>
		</div>
	);
}

export default ProfitabilityPrediction;
