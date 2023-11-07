import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import { LoadingState } from '../../../../common/Elements';
import AccountTypeWise from '../../../../common/Elements/AccountTypeWise';
import calcChange from '../../../../helpers/calcChange';
import useSmeDashboardStats from '../../../../hooks/useSmeDashboardStats';

import styles from './styles.module.css';

const CALL_STATUS_MAPPING = {
	answered: {
		label : 'Call Successfully Answered',
		count : 'total_answered_calls',
		icon  : <Image
			src={GLOBAL_CONSTANTS.image_url.call_answered}
			height={26}
			width={26}
			alt="answered"
		/>,
		non_allocated : 'unallocated_answered_calls',
		allocated     : 'allocated_missed_calls',
	},
	missed: {
		label : 'Call Missed',
		count : 'total_missed_calls',
		icon  : <Image
			src={GLOBAL_CONSTANTS.image_url.call_missed}
			height={30}
			width={30}
			alt="missed"
		/>,
		non_allocated : 'unallocated_missed_calls',
		allocated     : 'allocated_missed_calls',
	},
};

function CallsReceivedStats({
	filterParams = {},
}) {
	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({
		widgetBlocks  : 'get_total_calls_received_data',
		filterParams,
		trendRequired : true,
	});

	const { total_calls_received_data = {} } = dashboardData || {};

	const { current_data = {}, previous_data = {} } = total_calls_received_data || {};

	return (
		<div className={styles.container}>
			<div className={styles.label}>
				Total Calls Received -
				{' '}
				{current_data?.total_calls || 0}
			</div>

			<div className={styles.body}>
				{dashboardLoading
					? <LoadingState />
					: Object.entries(CALL_STATUS_MAPPING).map(
						([type, itm]) => (
							<div
								key={type}
								className={styles.call_status}
							>
								<div className={styles.call_stats}>
									{itm?.icon}

									<div className={styles.count_stats}>
										{current_data?.[itm?.count]}
									</div>
								</div>

								<div className={styles.call_status_label}>
									{itm?.label}
								</div>

								<div className={styles.segregation}>
									<AccountTypeWise
										segregated
										decimalNotRequired
										label="Allocated"
										dataValue={current_data?.[itm?.allocated]}
										change={calcChange({
											valueKey     : itm?.allocated,
											currentData  : current_data,
											previousData : previous_data,
										})}
									/>

									<AccountTypeWise
										segregated
										decimalNotRequired
										label="Not-allocated"
										dataValue={current_data?.[itm?.non_allocated]}
										change={calcChange({
											valueKey     : itm?.non_allocated_change,
											currentData  : current_data,
											previousData : previous_data,
										})}
									/>
								</div>
							</div>
						),
					)}
			</div>
		</div>
	);
}

export default CallsReceivedStats;
