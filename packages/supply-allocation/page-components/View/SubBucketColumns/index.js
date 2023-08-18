import Promised from './Promised';
import ServiceProvider from './ServiceProvider';
import styles from './styles.module.css';

function GetOrdinalNumber({ number }) {
	const suffix = ['th', 'st', 'nd', 'rd'];
	const quotient = number % 100;
	const ordinal = suffix[(quotient - 20) % 10] || suffix[quotient] || suffix[0];
	return (
		<>
			<span className="black">{number}</span>
			<sup>{ordinal}</sup>
		</>
	);
}

const getSubBucketColumns = ({ control = {}, unregister }) => {
	const subBucketColumns = [
		{
			id       : 'service_provider',
			Header   : 'SERVICE PROVIDER',
			accessor : (item) => <ServiceProvider item={item} />,
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
				<div>CAPABILITY</div>
			),
			accessor: (item) => item.capability,
		},
		{
			id     : 'past_allocated',
			Header : (
				<>
					<div>Past Allocated</div>
					<div>(last 4 weeks)</div>
				</>),
			accessor: ({ past_allocation = '' }) => `${past_allocation} TEU`,
		},
		{
			id: 'fulfilled',
			Header:
				(
					<>
						<div>FULLFILLED</div>
						<div>(last 4 weeks)</div>
					</>),
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
						<GetOrdinalNumber number={avg_rate_rank} />
					</div>

					<div className={styles.profitability_sub_container}>
						(Profitability
						{' '}
						{profitability}
						%)
					</div>
				</>
			),
		},
	];
	return { subBucketColumns };
};
export default getSubBucketColumns;
