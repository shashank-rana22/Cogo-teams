import React from 'react';

import AccountTypeWise from '../../../common/Elements/AccountTypeWise';

import styles from './styles.module.css';

const DATA_TO_SHOW = {
	call: {
		label                : 'Call Connected',
		total                : 'total_calls_per_agent',
		total_change         : 'total_calls_change',
		allocated            : 'allocated_calls_per_agent',
		allocated_change     : 'allocated_calls_change',
		non_allocated        : 'non_allocated_calls_per_agent',
		non_allocated_change : 'non_allocated_calls_change',
	},
	quotes: {
		label                : 'Quotes',
		total                : 'total_quotes_per_agent',
		total_change         : 'total_quotes_change',
		allocated            : 'allocated_quotes_per_agent',
		allocated_change     : 'allocated_quotes_change',
		non_allocated        : 'non_allocated_quotes_per_agent',
		non_allocated_change : 'non_allocated_quotes_change',
	},
	bookings: {
		label                : 'Bookings',
		total                : 'total_bookings_per_agent',
		total_change         : 'total_bookings_change',
		allocated            : 'allocated_bookings_per_agent',
		allocated_change     : 'allocated_bookings_change',
		non_allocated        : 'non_allocated_bookings_per_agent',
		non_allocated_change : 'non_allocated_bookings_change',
	},
};

const DATA = {
	total_calls_per_agent            : 2.2,
	total_calls_change               : 1.2,
	allocated_calls_per_agent        : 2.0,
	allocated_calls_change           : 3.2,
	non_allocated_calls_per_agent    : 1.0,
	non_allocated_calls_change       : -2.0,
	total_quotes_per_agent           : 44.15,
	total_quotes_change              : -12.3,
	allocated_quotes_per_agent       : 44.0,
	allocated_quotes_change          : -15,
	non_allocated_quotes_per_agent   : 17.0,
	non_allocated_quotes_change      : 10.0,
	total_bookings_per_agent         : 1.5,
	total_bookings_change            : 20,
	allocated_bookings_per_agent     : 2.3,
	allocated_bookings_change        : 30,
	non_allocated_bookings_per_agent : 0.8,
	non_allocated_bookings_change    : -10,
};

function PerAgentData() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Per Agent Data
			</div>

			<div className={styles.body}>
				{Object.entries(DATA_TO_SHOW).map(
					([key, value]) => (
						<div key={key} className={styles.child_body}>
							<AccountTypeWise
								title={key}
								label={value?.label}
								dataValue={DATA?.[value?.total]}
								change={DATA?.[value?.total_change]}
							/>
							<div className={styles.segregation}>
								<AccountTypeWise
									segregated
									label="Allocated"
									dataValue={DATA?.[value?.allocated]}
									change={DATA?.[value?.allocated_change]}
								/>

								<AccountTypeWise
									segregated
									label="Non-allocated"
									dataValue={DATA?.[value?.non_allocated]}
									change={DATA?.[value?.non_allocated_change]}
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
