import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDummyCircle, IcMProfile, IcMCall } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import dateTimeConverter from '../../../../../utils/dateTimeConverter';

import styles from './styles.module.css';

function ShipmentProgress({
	cardData = {},
	isTriggeredFromSideBar = false,
}) {
	const {
		call_details = {},
		reverted_status = '',
		assigned_to = {},
		created_at = '',
	} = cardData || {};
	const { agent_data = {}, end_time_of_call = '', start_time_of_call = '' } = call_details || {};
	const { name = '' } = agent_data || {};

	const { name: assignedAgentName = '' } = assigned_to || {};

	const endTimeEpoch = (new Date(end_time_of_call)).getTime();

	const startTimeEpoch = (new Date(start_time_of_call)).getTime();

	const currentTime = Date.now();

	return (
		<div className={styles.container}>

			<div className={cl`${styles.contact_info} 
				${isTriggeredFromSideBar ? styles.side_contact_info : ''}`}
			>
				<span className={styles.label}>
					Created At
				</span>

				<span className={styles.primary_data}>
					{`: ${
						formatDate({
							date       : created_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							formatType : 'dateTime',
							separator  : ', ',
						})
					}`}
				</span>
			</div>

			<div className={cl`${styles.contact_info} 
				${isTriggeredFromSideBar ? styles.side_contact_info : ''}`}
			>
				<span className={styles.label}>
					Assigned To
				</span>

				<span className={styles.primary_data}>
					:
					<IcMProfile className={styles.icon_styles} />
					{startCase(assignedAgentName) || 'NA'}
				</span>
			</div>

			<div className={cl`${styles.contact_info} 
				${isTriggeredFromSideBar ? styles.side_contact_info : ''}`}
			>
				<span className={styles.label}>
					Revert Status
				</span>

				<span className={styles.primary_data}>
					{`: ${startCase(reverted_status) || 'NA'}`}
				</span>
			</div>

			<div
				className={cl`${styles.contact_info} ${styles.side_contact_info}`}
				style={{
					flexDirection: isTriggeredFromSideBar ? 'column' : 'row',
				}}
			>
				<div className={styles.label}>
					Last Contact
				</div>

				<div
					className={styles.details}
					style={{ maxWidth: isTriggeredFromSideBar ? '100%' : 'calc(50% - 50px)' }}
				>
					<div
						className={styles.contact_details}
						style={{ width: isTriggeredFromSideBar ? '38px' : '22px' }}
					>
						{isTriggeredFromSideBar ? <IcMDummyCircle className={styles.dummy_circle} /> : ':'}
						<IcMProfile className={styles.icon_styles} />
					</div>
					<span className={styles.secondary_data}>
						{startCase(name) || 'NA'}
					</span>
				</div>

				<div className={cl`${styles.details} ${styles.secondary_details}`}>
					{(endTimeEpoch || startTimeEpoch) ? (
						<>
							<div className={styles.contact_details}>
								<IcMDummyCircle className={styles.dummy_circle} />
								<IcMCall className={styles.icon_styles} fill="#849E4C" />
							</div>
							<div className={cl`${styles.secondary_data} ${styles.details_secondary_data}`}>
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
							</div>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default ShipmentProgress;
