import Line from '../../../../../common/Line';
import Margin from '../../../../../common/MiniCard/Margin';
import Percentage from '../../../../../common/MiniCard/Percentage';
import useGetContractPortPairProjectedStats from '../../../../../hooks/useGetContractPortPairProjectedStats';

import styles from './styles.module.css';

function RevenuePrediction({ activePair, data, statsData }) {
	const { data: statsDataRevenue } = useGetContractPortPairProjectedStats({
		payload: {
			...activePair,
			contract_service_id      : activePair?.id,
			id                       : data?.id,
			requested_contract_price : statsData?.requested_contract_price,
		},
	});

	let heading = 'No. Of Containers In Current Request';
	let value = activePair?.containers_count;

	if (activePair?.service_type === 'air_freight'
	) {
		heading = 'Weight In Current Request';
		value = `${activePair?.weight} Kg`;
	}
	if (activePair?.service_type === 'lcl_freight'
	) {
		heading = 'Volume In Current Request';
		value = `${activePair?.volume}  CBM`;
	}
	return (
		<div className={styles.revenue}>
			<div className={styles.revenue_stats}>
				<Percentage
					heading="Avg. Contract Utilization"
					data={statsDataRevenue?.avg_contract_utilization?.toFixed(2)}
				/>
				<Line />
				{statsDataRevenue?.requested_contract_price ? (
					<>
						<Margin
							heading="Requested Contract Price"
							value={statsDataRevenue?.requested_contract_price?.toFixed(2)}
						/>
						<Line />
					</>
				) : null}
				<div className={styles.card}>
					<div className={styles.value_heading}>{heading}</div>
					<div className={styles.margin}>
						<div className={styles.value}>
							{value}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.projected_revenue}>
				<div>
					<div>Projected Revenue</div>
					<div>(Ctr. Request x %Utilization x Ctr. Price)</div>
				</div>
				<div className={styles.revenue_value}>
					$
					{statsDataRevenue?.projected_revenue?.toFixed(2)}
				</div>
			</div>
		</div>
	);
}
export default RevenuePrediction;
