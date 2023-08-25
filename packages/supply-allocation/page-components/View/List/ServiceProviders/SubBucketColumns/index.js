import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { getItemDisplayString } from '../../../../../utils/generateDisplayName';

import Promised from './Promised';
import ServiceProvider from './ServiceProvider';
import styles from './styles.module.css';

const C = 100;
const DEF = GLOBAL_CONSTANTS.zeroth_index;
const SUB = 20;
const ANO_SUB = 10;

function GetOrdinalNumber({ number = 0 }) {
	const suffix = ['th', 'st', 'nd', 'rd'];
	const quotient = number % C;
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
	refetchBucketsData = () => {},
}) => {
	const subBucketColumns = [
		{
			id       : 'service_provider',
			Header   : 'SERVICE PROVIDER',
			accessor : (item) => (
				<ServiceProvider
					item={item}
					bucket_type={bucket_type}
					current_allocated_containers={current_allocated_containers}
					rollingFclFreightSearchId={rollingFclFreightSearchId}
					refetchBucketsData={refetchBucketsData}
				/>
			),
		},
		{
			id       : 'Allocated',
			Header   : 'ALLOCATED',
			accessor : (item) => (
				<Promised item={item} control={control} unregister={unregister} bulkEditMode={bulkEditMode} />
			),
		},
		{
			id       : 'capability',
			Header   : <div>CAPABILITY</div>,
			accessor : ({ capability = 0 }) => (capability ? (`${capability} TEU`) : ('0 TEU')),
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
					<div>FULLFILLED</div>
					<div className={styles.last_four_weeks}>
						Last 4 weeks
					</div>
				</>
			),
			accessor: ({ allocated_containers = 0 }) => (allocated_containers
				? (`${allocated_containers} TEU`) : ('0')),
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
								{ getItemDisplayString({ count: rolling_shipments, itemType: 'Rolling Shipment' })}
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
