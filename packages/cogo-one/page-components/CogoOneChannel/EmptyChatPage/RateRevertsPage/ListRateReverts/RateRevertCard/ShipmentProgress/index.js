import { IcMDummyCircle, IcMProfile, IcMCall } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import getReadableDateDifference from '../../../../../../../utils/getReadableDateDifference';

import styles from './styles.module.css';

function ShipmentProgress({ cardData = {} }) {
	const { call_details = {}, reverted_status = '' } = cardData || {};
	const { agent_data = {}, end_time_of_call = '', start_time_of_call = '' } = call_details || {};
	const { name = '' } = agent_data || {};

	return (
		<div className={styles.container}>
			<div className={styles.contact_info}>
				<span className={styles.label}>
					Revert Status:
				</span>
				<span className={styles.primary_data}>
					{startCase(reverted_status)}
				</span>
			</div>

			<div className={styles.contact_info}>
				<span className={styles.label}>
					Agent :
				</span>

				<IcMProfile className={styles.icon_styles} />
				<span className={styles.primary_data}>
					{startCase(name) || 'NA'}
				</span>

				{!isEmpty(call_details) ? (
					<>
						<IcMDummyCircle className={styles.dummy_circle} />
						<IcMCall className={styles.icon_styles} fill="#849E4C" />
						<span className={styles.secondary_data}>
							Contacted
							{' '}
							<span>
								{getReadableDateDifference({
									end   : new Date(end_time_of_call),
									start : new Date(start_time_of_call),
								})}
							</span>
						</span>

					</>
				) : null}

			</div>
		</div>
	);
}

export default ShipmentProgress;
