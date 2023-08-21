import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import Promised from './Promised';
import ServiceProvider from './ServiceProvider';

const C = 100;
const DEF = GLOBAL_CONSTANTS.zeroth_index;
const SUB = 20;
const ANO_SUB = 10;

function GetOrdinalNumber({ number = 0 }) {
	const suffix = ['th', 'st', 'nd', 'rd'];
	const quotient = number % C;
	const ordinal = suffix[(quotient - SUB) % ANO_SUB] || suffix[quotient] || suffix[DEF];
	return (
		<>
			<span className="black">{number}</span>
			<sup>{ordinal}</sup>
		</>
	);
}

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
			Header   : 'SERVICE PROVIDER',
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
					<div>
						{avg_deviation_from_best_rate}
						{' '}
						%
					</div>

					<div>
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
					<div>
						<GetOrdinalNumber number={avg_rate_rank} />
					</div>

					<div>
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
