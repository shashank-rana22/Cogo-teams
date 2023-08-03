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

const subBucketColumns = [
	{
		id       : 'actions',
		Header   : '',
		accessor : (item) => <Actions item={item} />,
	},
	{
		id       : 'service_provider',
		Header   : 'Service Provider',
		accessor : (item) => item.service_provider,
	},
	{
		id       : 'promised',
		Header   : 'Promised',
		accessor : (item) => (
			<Promised item={item} />
		),
	},
	{
		id     : 'capability',
		Header : (
			<>
				<div>Capability</div>
				<div>(ON BEST RATE)</div>
			</>
		),
		accessor: (item) => item.capability,
	},
	{
		id       : 'allocated',
		Header   : 'Allocated',
		accessor : ({ unit = '', percent = '' }) => <Label unit={unit} percent={percent} type="allocated" />,
	},
	{
		id       : 'fulfilled',
		Header   : 'Fulfilled',
		accessor : ({ unit = '', percent = '' }) => <Label unit={unit} percent={percent} type="fulfilled" />,
	},
	{
		id     : 'avg_deviation',
		Header : (
			<>
				<div>Avg Deviation</div>
				<div>from best rate</div>
			</>
		),
		accessor: (item) => item.avg_deviation,
	},
	{
		id     : 'avg_rank',
		Header : (
			<>
				<div>Avg Rate rank</div>
				<div> (Cogoport Profitability)</div>
			</>
		),
		accessor: (item) => item.avg_rank,
	},
];

export default subBucketColumns;
