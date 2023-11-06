import React from 'react';

import AccountTypeWise from '../../../common/Elements/AccountTypeWise';
import calcChange from '../../../helpers/calcChange';
import useSmeDashboardStats from '../../../hooks/useSmeDashboardStats';

import styles from './styles.module.css';

const DATA_TO_SHOW = {
	call: {
		label         : 'Call Connected',
		total         : 'per_agent_calls',
		allocated     : 'per_agent_allocated_calls',
		non_allocated : 'per_agent_unallocated_calls',
	},
	quotes: {
		label         : 'Quotes',
		total         : 'per_agent_quotes',
		allocated     : 'per_agent_allocated_quotes',
		non_allocated : 'per_agent_unallocated_quotes',
	},
	bookings: {
		label         : 'Bookings',
		total         : 'per_agent_bookings',
		allocated     : 'per_agent_allocated_bookings',
		non_allocated : 'per_agent_unallocated_bookings',
	},
};

function PerAgentData({ widgetBlocks = null }) {
	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({ widgetBlocks });

	const { per_agent_data = {} } = dashboardData || {};

	const { current_data = {}, previous_data = {} } = per_agent_data || {};

	if (dashboardLoading) {
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					Per Agent Data
				</div>
				<div className={styles.loading_container}>
					{[...Array(30).keys()].map(
						(idx) =>	(
							<div
								key={idx}
								className={styles.wave_animation}
							/>
						),
					)}
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Per Agent Data
			</div>

			<div className={styles.body}>
				{Object.entries(DATA_TO_SHOW).map(
					([key, value]) => (
						<div
							key={key}
							className={styles.child_body}
						>
							<AccountTypeWise
								title={key}
								label={value?.label}
								dataValue={current_data?.[value?.total]}
								change={calcChange({
									valueKey     : value?.total,
									currentData  : current_data,
									previousData : previous_data,
								})}
							/>

							<div className={styles.segregation}>
								<AccountTypeWise
									segregated
									label="Allocated"
									dataValue={current_data?.[value?.allocated]}
									change={calcChange({
										valueKey     : value?.allocated,
										currentData  : current_data,
										previousData : previous_data,
									})}
								/>

								<AccountTypeWise
									segregated
									label="Non-allocated"
									dataValue={current_data?.[value?.non_allocated]}
									change={calcChange({
										valueKey     : value?.non_allocated,
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

export default PerAgentData;
