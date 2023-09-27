import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMCall, IcMShip, IcMSettings } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import EmptyList from '../EmptyList';

import styles from './styles.module.css';

const ICON_MAPPING = {
	call_customer: {
		icon  : <IcMCall width={16} height={16} />,
		color : '#FCEEDF',
	},
	send_quotation: {
		icon  : <IcMShip width={16} height={16} />,
		color : '#F3FAFA',
	},
	other: {
		icon  : <IcMSettings width={16} height={16} />,
		color : '#F3FAFA',
	},
};

function UserEvents({ selectedEventData = {} }) {
	const { marked_events: markedEvents = [], start = '' } = selectedEventData || {};

	const USER_CONTACT_DETAILS = ['Ramesh Naidu', '+91 7893486780', 'ramesh.naidu@gmail.com'];

	const sedualTime = formatDate({
		date       : start || new Date(),
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aa'],
		formatType : 'time',
	});

	if (isEmpty(markedEvents)) {
		return (
			<div className={styles.empty_container}>
				<EmptyList />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{(markedEvents || []).map((singleEvent) => {
				const {
					event_types = '', customer = '', remarks = '',
					end = '', important = false,
				} = singleEvent || {};

				const isNotActiveEvents = new Date(end)?.getTime() < new Date().getTime();

				const icons = ICON_MAPPING[event_types];

				return (
					<div
						className={cl`${styles.card} 
					${isNotActiveEvents ? styles.expired_event : ''}
					${important ? styles.important_event : styles.not_important_event}
					`}
						key={singleEvent?.id}
					>
						<div className={styles.avatar_container}>
							<div className={styles.avatar} style={{ background: `${icons?.color}` }}>
								{icons?.icon}
							</div>
							<div className={styles.time}>
								{sedualTime}
							</div>
						</div>
						<div className={styles.details}>
							<div className={styles.business_name}>
								{startCase(customer)}
							</div>
							<div className={styles.description}>
								{remarks}
							</div>
							<div className={styles.poc_details}>
								<div className={styles.name}>
									POC :
								</div>
								<div className={styles.poc_data}>
									{(USER_CONTACT_DETAILS || []).map((item) => (
										<div className={styles.contact_details} key={item}>
											{item}
										</div>
									))}

								</div>
							</div>
						</div>
					</div>
				);
			})}

		</div>
	);
}

export default UserEvents;
