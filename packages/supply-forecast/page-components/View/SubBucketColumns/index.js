import Actions from './Actions';
import Promised from './Promised';

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
		accessor : (item) => item.allocated,
	},
	{
		id       : 'fulfilled',
		Header   : 'Fulfilled',
		accessor : (item) => item.fulfilled,
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
