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
		Header   : 'SERVICE PROVIDER',
		accessor : (item) => item.service_provider,
	},
	{
		id       : 'promised',
		Header   : 'PROMISED',
		accessor : (item) => (
			<Promised item={item} />
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
		id       : 'allocated',
		Header   : 'ALLOCATED',
		accessor : ({ unit = '', percent = '' }) => <Label unit={unit} percent={percent} type="allocated" />,
	},
	{
		id       : 'fulfilled',
		Header   : 'FULLFILLED',
		accessor : ({ unit = '', percent = '' }) => <Label unit={unit} percent={percent} type="fulfilled" />,
	},
	{
		id     : 'avg_deviation',
		Header : (
			<>
				<div>AVG DEVAITION</div>
				<div>FROM BEST RATE</div>
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
		accessor: ({ unit = '', percent = '' }) => <Label unit={unit} percent={percent} type="profitability" />,
	},
];

export default subBucketColumns;
