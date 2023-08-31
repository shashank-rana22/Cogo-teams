import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { getItemDisplayString } from '../../../../../utils/generateDisplayName';

import Actions from './Actions';
import Promised from './Promised';
import ServiceProvider from './ServiceProvider';
import styles from './styles.module.css';

const HUNDRED = 100;
const DEF = GLOBAL_CONSTANTS.zeroth_index;
const SUB = 20;
const ANO_SUB = 10;
const ROUNDING_BASE = 10;

function GetOrdinalNumber({ number = 0 }) {
	const suffix = ['th', 'st', 'nd', 'rd'];
	const quotient = number % HUNDRED;
	const ordinal =	suffix[(quotient - SUB) % ANO_SUB] || suffix[quotient] || suffix[DEF];
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
	current_allocated_containers,
	bucket_type,
	bulkEditMode = false,
	rollingFclFreightSearchId,
	refetchBucketsData = () => { },
	refetchServiceProvidersData = () => {},
}) => {
	const subBucketColumns = [
		{
			id       : 'actions',
			Header   : '',
			accessor : (item) => (
				<Actions
					item={item}
					bucket_type={bucket_type}
					current_allocated_containers={current_allocated_containers}
					rollingFclFreightSearchId={rollingFclFreightSearchId}
					refetchBucketsData={refetchBucketsData}
					refetchServiceProvidersData={refetchServiceProvidersData}
				/>
			),
		},
		{
			id       : 'service_provider',
			Header   : 'Service Provider',
			accessor : (item) => (
				<ServiceProvider
					item={item}
				/>
			),
		},
		{
			id       : 'Allocated',
			Header   : 'Allocated',
			accessor : (item) => (
				<Promised item={item} control={control} unregister={unregister} bulkEditMode={bulkEditMode} />
			),
		},
		{
			id       : 'capability',
			Header   : <div>Capability</div>,
			accessor : ({ capability = 0 }) => (capability ? (`${capability} TEU`) : 'N/A'),
		},
		{
			id     : 'past_allocated',
			Header : (
				<>
					<div>Past Allocated</div>
					<div className={styles.last_four_weeks}>Last 4 weeks</div>
				</>
			),
			accessor: ({ past_allocation = 0 }) => (past_allocation ? (`${past_allocation} TEU`) : ('0 TEU')),
		},
		{
			id     : 'fulfilled',
			Header : (
				<>
					<div>Fulfilled</div>
					<div className={styles.last_four_weeks}>
						Last 4 weeks
					</div>
				</>
			),
			accessor: ({ fulfilled = 0 }) => (fulfilled
				? (`${fulfilled} TEU`) : ('0 TEU')),
		},
		{
			id     : 'avg_deviation',
			Header : (
				<>
					<div>Avg Deviation</div>
					<div>From Best Rate</div>
				</>
			),
			accessor: ({ avg_deviation_from_best_rate, rolling_shipments }) => (
				<>
					{avg_deviation_from_best_rate
						? (
							<div>
								{Math.round(avg_deviation_from_best_rate * ROUNDING_BASE) / ROUNDING_BASE}
								{' '}
								%
							</div>
						) : 'N/A'}

					{rolling_shipments
						? (
							<div className={styles.rolling_shipments}>
								{ getItemDisplayString({ count: rolling_shipments, itemType: 'Rolling Shipment' })}
							</div>
						) : null}
				</>
			),
		},
		{
			id       : 'avg_rank',
			Header   : (<div>Avg Rate rank</div>),
			accessor : ({ avg_rate_rank = '' }) => (
				avg_rate_rank
					? (
						<div>
							<GetOrdinalNumber number={avg_rate_rank} />
						</div>
					) : 'N/A'
			),
		},
	];
	return {
		subBucketColumns,
	};
};

export default getSubBucketColumns;
