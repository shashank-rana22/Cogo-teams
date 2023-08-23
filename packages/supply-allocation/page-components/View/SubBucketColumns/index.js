import GetOrdinalNumber from '../../../utils/GetOrdinalNumber';

import Promised from './Promised';
import ServiceProvider from './ServiceProvider';
import styles from './styles.module.css';

const getSubBucketColumns = ({
	control = {},
	unregister,
	bucketOptions,
	current_allocated_containers,
	bucket_type,
	rollingFclFreightSearchId,
}) => {
	const subBucketColumns = [
		{
			id       : 'service_provider',
			Header   : 'SERVICE PROVIDER', // font weight 700
			accessor : (item) => (
				<ServiceProvider
					item={item}
					bucketOptions={bucketOptions}
					bucket_type={bucket_type}
					current_allocated_containers={current_allocated_containers}
					rollingFclFreightSearchId={rollingFclFreightSearchId}
				/>
			),
		},
		{
			id       : 'Allocated',
			Header   : 'ALLOCATED',
			accessor : (item) => (
				<Promised item={item} control={control} unregister={unregister} />
			),
		},
		{
			id       : 'capability',
			Header   : <div>CAPABILITY</div>,
			accessor : (item) => (
				<div>
					{item.capability}
					{' '}
					TEU
				</div>
			),
		},
		{
			id     : 'past_allocated',
			Header : (
				<>
					<div>Past Allocated</div>
					<div className={styles.last_four_weeks}>Last 4 weeks</div>
				</>
			),
			accessor: ({ past_allocation = '' }) => `${past_allocation} TEU`,
		},
		{
			id     : 'fulfilled',
			Header : (
				<>
					<div>FULLFILLED</div>
					<div className={styles.last_four_weeks}>
						Last 4 weeks

					</div>
				</>
			),
			accessor: ({ allocated_containers = 0 }) => `${allocated_containers} TEU`,
		},
		{
			id     : 'avg_deviation',
			Header : (
				<>
					<div>AVG DEVAITION</div>
					<div>FROM BEST RATE</div>
				</>
			),
			accessor: ({ avg_deviation_from_best_rate, rolling_shipments }) => (
				<>
					<div>
						{avg_deviation_from_best_rate}
						{' '}
						%
					</div>

					{rolling_shipments
						? (
							<div className={styles.rolling_shipments}>

								{rolling_shipments}
								{' '}
								Rolling Shipments
							</div>
						) : null}
				</>
			),
		},
		{
			id     : 'avg_rank',
			Header : (
				<>
					<div>Avg Rate rank</div>
					<div className={styles.profitability}>
						(Cogoport Profitability)

					</div>
				</>
			),
			accessor: ({ avg_rate_rank = '', profitability }) => (
				<>
					<div>
						<GetOrdinalNumber number={avg_rate_rank} />
					</div>

					<div className={styles.profitability}>
						(Profitability
						{' '}
						{profitability}
						%)
					</div>
				</>
			),
		},
	];
	return {
		subBucketColumns,
	};
};

export default getSubBucketColumns;
