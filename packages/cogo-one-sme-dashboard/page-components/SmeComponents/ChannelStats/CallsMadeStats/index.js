import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import { LoadingState } from '../../../../common/Elements';
import AccountTypeWise from '../../../../common/Elements/AccountTypeWise';
import calcChange from '../../../../helpers/calcChange';
import useSmeDashboardStats from '../../../../hooks/useSmeDashboardStats';

import styles from './styles.module.css';

const CALL_TYPES = {
	connected: {
		label : 'Call Connected Successfully',
		value : 'auto_triggered',
		count : 'total_calls_connected',
		icon  : <Image
			src={GLOBAL_CONSTANTS.image_url.call_answered}
			height={26}
			width={26}
			alt="answered"
		/>,
		non_allocated : 'unallocated_calls_connected',
		allocated     : 'allocated_calls_connected',
	},
	not_connected: {
		label : 'Call Not Connected',
		value : 'agent_triggered',
		count : 'total_calls_not_connected',
		icon  : <Image
			src={GLOBAL_CONSTANTS.image_url.call_not_connected}
			height={26}
			width={26}
			alt="answered"
		/>,
		non_allocated : 'unallocated_calls_not_connected',
		allocated     : 'allocated_calls_not_connected',
	},
	rejected: {
		label : 'Call Disconnected by Customer',
		value : 'marketing_triggered',
		count : 'total_calls_disc_by_customer',
		icon  : <Image
			src={GLOBAL_CONSTANTS.image_url.call_rejected}
			height={26}
			width={26}
			alt="answered"
		/>,
		non_allocated : 'unallocated_calls_disc_by_customer',
		allocated     : 'allocated_calls_disc_by_customer',
	},
};

function CallsMadeStats({ filterParams = {} }) {
	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({
		widgetBlocks  : 'get_total_calls_made_data',
		filterParams,
		trendRequired : true,
	});

	const { total_calls_made_data = {} } = dashboardData || {};

	const { current_data = {}, previous_data = {} } = total_calls_made_data || {};

	return (
		<div className={styles.container}>
			<div className={styles.label}>
				Total Calls Made -
				<span>{current_data?.total_calls}</span>
			</div>

			<div className={styles.view_report}>
				{dashboardLoading
					? <LoadingState />
					: Object.entries(CALL_TYPES).map(
						([type, itm]) => (
							<div
								key={type}
								className={styles.message_type_stats}
							>
								<div className={styles.call_stats}>
									{itm?.icon}

									<div className={styles.count_stats}>
										{current_data?.[itm?.count] || 0}
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
											valueKey     : itm?.non_allocated,
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

export default CallsMadeStats;
