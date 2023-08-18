import Actions from './Actions';
import Promised from './Promised';
import styles from './styles.module.css';

function Label({ units = '', percent = '', type = '' }) {
	return (
		<>
			<div className={styles[`${type}_container`]}>
				{units}
				{' '}
				TEU
			</div>

			<div className={styles[`${type}_sub_container`]}>
				{ percent}
				{' '}
				% of Capability
			</div>
		</>
	);
}

const getSubBucketColumns = ({ control = {}, unregister }) => {
	const subBucketColumns = [
		{
			id       : 'actions',
			Header   : '',
			accessor : (item) => <Actions item={item} />,
		},
		{
			id       : 'service_provider',
			Header   : 'SERVICE PROVIDER',
			accessor : (item) => item?.service_provider?.short_name,
		},
		{
			id       : 'Allocated',
			Header   : 'Allocated',
			accessor : (item) => (
				<Promised item={item} control={control} unregister={unregister} />
			),
		},
		{
			id     : 'capability',
			Header : (
				<>
					<div>CAPABILITY</div>
					<div>(ON BEST RATE)</div>
				</>
			),
			accessor: (item) => item.capability,
		},
		{
			id       : 'past_allocated',
			Header   : 'PAST ALLOCATED',
			accessor : ({ unit = '', percent = '' }) => <Label unit={unit} percent={percent} type="allocated" />,
		},
		{
			id: 'fulfilled',
			Header:
				(
					<>
						<div>FULLFILLED</div>
						<div>(last 4 weeks)</div>
					</>),
			accessor: ({ unit = '', percent = '' }) => <Label unit={unit} percent={percent} type="fulfilled" />,
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
					<div className={styles.profitability_container}>
						{avg_deviation_from_best_rate}
						{' '}
						%
					</div>

					<div className={styles.profitability_sub_container}>
						(
						{rolling_shipments}
						{' '}
						rolling shipments)
					</div>
				</>
			),
		},
		{
			id     : 'avg_rank',
			Header : (
				<>
					<div>Avg Rate rank</div>
					<div> (Cogoport Profitability)</div>
				</>
			),
			accessor: ({ avg_rate_rank = '', profitability }) => (
				<>
					<div className={styles.profitability_container}>
						{avg_rate_rank}
					</div>

					<div className={styles.profitability_sub_container}>
						(Profitability
						{profitability}
						)
					</div>
				</>
			),
		},
	];
	return { subBucketColumns };
};
export default getSubBucketColumns;
