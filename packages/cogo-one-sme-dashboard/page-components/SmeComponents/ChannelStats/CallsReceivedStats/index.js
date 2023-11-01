import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import AccountTypeWise from '../../../../common/Elements/AccountTypeWise';

import styles from './styles.module.css';

const CALL_STATUS_MAPPING = {
	answered: {
		label : 'Call Successfully Answered',
		count : 130,
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
	missed: {
		label : 'Call Missed',
		count : 77,
		icon  : <Image
			src={GLOBAL_CONSTANTS.image_url.call_missed}
			height={30}
			width={30}
			alt="missed"
		/>,
		non_allocated        : 93,
		non_allocated_change : 13,
		allocated            : 17,
		allocated_change     : -9.0,
	},
};

function CallsReceivedStats() {
	return (
		<div className={styles.container}>
			<div className={styles.label}>
				Total Calls Received - 2000
			</div>

			<div className={styles.body}>
				{Object.entries(CALL_STATUS_MAPPING).map(
					([type, itm]) => (
						<div
							key={type}
							className={styles.call_status}
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

export default CallsReceivedStats;
