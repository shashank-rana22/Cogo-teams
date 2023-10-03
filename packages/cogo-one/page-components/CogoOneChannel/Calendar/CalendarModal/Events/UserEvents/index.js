import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMCall, IcMShip, IcMSettings, IcMAgentManagement } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import EmptyList from '../EmptyList';

import styles from './styles.module.css';

const LAST_INDEX = 1;
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
	default: {
		icon  : <IcMAgentManagement width={16} height={16} />,
		color : '#F3FAFA',
	},
};

function UserEvents({ selectedEventData = {} }) {
	const { eventsList: markedEvents = [] } = selectedEventData || {};

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
					subject = '', description = '', metadata = {},
					is_important = false, validity_start = '', category = '', validity_end = '',
					participants = [],
				} = singleEvent || {};

				const { organization_data = {}, user_data = {}	} = metadata || {};

				const USER_CONTACT_DETAILS = [user_data?.name, user_data?.email];

				const startTime = formatDate({
					date       : new Date(validity_start),
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aa'],
					formatType : 'time',
				});

				const endTime = formatDate({
					date       : new Date(validity_end),
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aa'],
					formatType : 'time',
				});

				const icons = ICON_MAPPING[subject] || ICON_MAPPING?.default;

				return (
					<div
						className={cl`${styles.card} 
					${is_important ? styles.important_event : styles.not_important_event}
					`}
						key={singleEvent?.id}
					>
						{category === 'meeting' ? (
							<div className={styles.meeting}>
								<Image
									src={GLOBAL_CONSTANTS.image_url.meetings}
									width={20}
									height={20}
									alt="logo"
								/>
							</div>
						) : null}

						<div className={styles.avatar_container}>
							<div className={styles.avatar} style={{ background: `${icons?.color}` }}>
								{icons?.icon}
							</div>
							{category === 'reminder' ? (
								<div className={styles.time}>
									{startTime}
								</div>
							) : null}
						</div>
						<div className={styles.details}>
							<div className={styles.business_name}>
								{startCase(organization_data?.business_name) || subject}
							</div>
							<div className={styles.description}>
								{description}
							</div>
							{category === 'reminder' ? (
								<div className={styles.poc_details}>
									<div className={styles.name}>
										POC:
									</div>
									<div className={styles.poc_data}>
										{(USER_CONTACT_DETAILS || []).map((item) => (
											<div className={styles.contact_details} key={item}>
												{item}
											</div>
										))}
									</div>
								</div>
							) : null}

							{category === 'meeting' ? (
								<>
									Partispants :
									<div className={styles.partispants}>
										{(participants || []).map((item, index) => (
											<div key={item?.id}>
												{item?.user_data?.name}
												{index < participants.length - LAST_INDEX && ','}
												{' '}
											</div>
										))}
									</div>

									<div className={styles.meeting_times}>
										Start at
										{' '}
										{startTime}
										{' '}
										and end at
										{' '}
										{endTime}
									</div>
								</>
							) : null}
						</div>
					</div>
				);
			})}

		</div>
	);
}

export default UserEvents;
