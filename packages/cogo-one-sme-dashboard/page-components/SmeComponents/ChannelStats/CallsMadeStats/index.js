import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import AccountTypeWise from '../../../../common/Elements/AccountTypeWise';

import styles from './styles.module.css';

const CALL_TYPES = {
	connected: {
		label : 'Call Connected Successfully',
		value : 'auto_triggered',
		count : 217,
		icon  : <Image
			src={GLOBAL_CONSTANTS.image_url.call_answered}
			height={26}
			width={26}
			alt="answered"
		/>,
		non_allocated        : 37,
		non_allocated_change : -17,
		allocated            : 117,
		allocated_change     : 9.0,
	},
	not_connected: {
		label : 'Call Not Connected',
		value : 'agent_triggered',
		count : 97,
		icon  : <Image
			src={GLOBAL_CONSTANTS.image_url.call_not_connected}
			height={26}
			width={26}
			alt="answered"
		/>,
		non_allocated        : 60,
		non_allocated_change : 9,
		allocated            : 37,
		allocated_change     : -11.0,
	},
	rejected: {
		label : 'Call Disconnected by Customer',
		value : 'marketing_triggered',
		count : 13,
		icon  : <Image
			src={GLOBAL_CONSTANTS.image_url.call_rejected}
			height={26}
			width={26}
			alt="answered"
		/>,
		non_allocated        : 10,
		non_allocated_change : -9,
		allocated            : 3,
		allocated_change     : 50,
	},
};

function SentStats() {
	return (
		<div className={styles.container}>
			<div className={styles.label}>
				Total Calls Made -
				<span>270</span>
			</div>

			<div className={styles.view_report}>
				{Object.entries(CALL_TYPES).map(
					([type, itm]) => (
						<div
							key={type}
							className={styles.message_type_stats}
						>
							<div className={styles.call_stats}>
								{itm?.icon}

								<div className={styles.count_stats}>
									{itm?.count}
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
									dataValue={itm?.allocated}
									change={itm?.allocated_change}
								/>

								<AccountTypeWise
									segregated
									decimalNotRequired
									label="Not-allocated"
									dataValue={itm?.non_allocated}
									change={itm?.non_allocated_change}
								/>
							</div>
						</div>
					),
				)}
			</div>
		</div>
	);
}

export default SentStats;
