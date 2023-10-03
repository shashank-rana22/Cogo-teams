import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import {
	IcMCall, IcMShip, IcMSettings, IcMAgentManagement,
	IcMTick, IcMAppDelete, IcMEdit,
} from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import ActionModal from '../ActionModal';
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

function UserEvents({
	selectedEventData = {}, getEvents = () => {},
	month = '',
}) {
	const { userId = '' } = useSelector(({ profile }) => ({ userId: profile?.user?.id }));
	const [actionModal, setActionModal] = useState({
		status       : false,
		value        : {},
		actionStatus : '',
	});

	const { eventsList: markedEvents = [] } = selectedEventData || {};

	const ACTIONS = [
		{
			key    : 'completed',
			icon   : <IcMTick width={20} height={20} fill="#27ae60" />,
			action : ({ singleEvent = {}, key = '' }) => setActionModal((prevEventDetails) => ({
				...prevEventDetails,
				status       : true,
				value        : singleEvent,
				actionStatus : key,
			})),
		},
		{
			key  : 'edit',
			icon : <IcMEdit width={14} height={14} fill="#34495e" />,
		},
		{
			key    : 'inactive',
			icon   : <IcMAppDelete width={16} height={16} fill="#e74c3c" />,
			action : ({ singleEvent = {}, key = '' }) => setActionModal((prevEventDetails) => ({
				...prevEventDetails,
				status       : true,
				value        : singleEvent,
				actionStatus : key,
			})),
		},
	];

	if (isEmpty(markedEvents)) {
		return (
			<div className={styles.empty_container}>
				<EmptyList />
			</div>
		);
	}

	return (
		<>
			<div className={styles.container}>
				{(markedEvents || []).map((singleEvent) => {
					const {
						subject = '', description = '', metadata = {},
						is_important = false, validity_start = '', category = '', validity_end = '',
						participants = [], performed_by_id = '', main_status,
					} = singleEvent || {};
					const isOwner = userId === performed_by_id;
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
					const isImportant = is_important && main_status !== 'completed';
					return (
						<div
							className={cl`${styles.card}
					${isImportant ? styles.important_event : styles.not_important_event}
					${main_status === 'completed' ? styles.expired_event : ''}
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
								<div
									className={styles.avatar}
									style={{
										background: main_status
									!== 'completed' ? `${icons?.color}` : 'rgb(221 221 221 / 20.1%)',
									}}
								>
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
										<div className={styles.title}>Partispants :</div>
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

								{isOwner && main_status !== 'completed' ? (
									<div className={styles.actions}>
										{((ACTIONS) || []).map((value) => (
											<div
												role="presentation"
												className={styles.single_action}
												key={value?.key}
												onClick={() => value?.action({ singleEvent, key: value?.key })}
											>
												{value.icon}

											</div>
										))}
									</div>
								) : null}

							</div>
						</div>

					);
				})}
			</div>

			<ActionModal
				actionModal={actionModal}
				setActionModal={setActionModal}
				getEvents={getEvents}
				month={month}
			/>
		</>
	);
}

export default UserEvents;
