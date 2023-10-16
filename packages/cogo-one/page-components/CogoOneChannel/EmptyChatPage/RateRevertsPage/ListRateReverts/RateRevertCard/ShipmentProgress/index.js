import { IcMDummyCircle, IcMProfile, IcMCall } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import dateTimeConverter from '../../../../../../../utils/dateTimeConverter';

import styles from './styles.module.css';

function ShipmentProgress({ cardData = {} }) {
	const { call_details = {}, reverted_status = '' } = cardData || {};
	const { agent_data = {}, end_time_of_call = '', start_time_of_call = '' } = call_details || {};
	const { name = '' } = agent_data || {};

	const endTimeEpoch = (new Date(end_time_of_call)).getTime();

	const startTimeEpoch = (new Date(start_time_of_call)).getTime();

	const currentTime = Date.now();

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
					Last Contact :
				</span>

				<IcMProfile className={styles.icon_styles} />

				<span className={styles.primary_data}>
					{startCase(name) || 'NA'}
				</span>

				{(endTimeEpoch || startTimeEpoch) ? (
					<>
						<IcMDummyCircle className={styles.dummy_circle} />
						<IcMCall
							className={styles.icon_styles}
							fill="#849E4C"
						/>
						<span className={styles.secondary_data}>
							Contacted
							{' '}
							<span>
								{
									dateTimeConverter(
										currentTime - (endTimeEpoch || startTimeEpoch),
										(endTimeEpoch || startTimeEpoch),
									)?.renderTime
								}
							</span>
						</span>
					</>
				) : null}

			</div>
		</div>
	);
}

export default ShipmentProgress;
